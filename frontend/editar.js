const API_BASE = '/api/productos';
let productId = null;

function showToast(msg, isErr = false) {
    const toastDiv = document.getElementById('globalToast');
    toastDiv.textContent = msg;
    toastDiv.style.backgroundColor = isErr ? '#9c2e1b' : '#2c5f2d';
    toastDiv.style.opacity = '1';
    toastDiv.style.visibility = 'visible';
    setTimeout(() => {
        toastDiv.style.opacity = '0';
        toastDiv.style.visibility = 'hidden';
    }, 2800);
}

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id || isNaN(parseInt(id))) return null;
    return parseInt(id);
}

async function loadProductAndRenderForm() {
    const container = document.getElementById('editBodyContent');
    productId = getProductIdFromUrl();
    if (!productId) {
        container.innerHTML = `<div class="error-box">⚠️ ID de producto no válido. <br><button class="btn-cancel" id="goBackErr">Volver al listado</button></div>`;
        const backBtn = document.getElementById('goBackErr');
        if (backBtn) backBtn.addEventListener('click', () => window.location.href = 'index.html');
        document.getElementById('productIdDisplay').innerText = "ID inválido";
        return;
    }
    document.getElementById('productIdDisplay').innerText = `Producto #${productId}`;
    
    try {
        const response = await fetch(`${API_BASE}/${productId}`);
        if (!response.ok) {
            if (response.status === 404) throw new Error('Producto no encontrado');
            throw new Error(`Error HTTP ${response.status}`);
        }
        const product = await response.json();
        renderEditForm(product);
    } catch (err) {
        console.error(err);
        container.innerHTML = `<div class="error-box">❌ ${err.message}<br><button class="btn-cancel" id="retryBtn">Reintentar</button> <button class="btn-cancel" id="backHome">Ir a inicio</button></div>`;
        document.getElementById('retryBtn')?.addEventListener('click', () => loadProductAndRenderForm());
        document.getElementById('backHome')?.addEventListener('click', () => window.location.href = 'index.html');
    }
}

function renderEditForm(product) {
    const container = document.getElementById('editBodyContent');
    container.innerHTML = `
        <form id="editForm">
            <div class="field">
                <label>Nombre *</label>
                <input type="text" id="editNombre" value="${escapeHtml(product.nombre)}" required>
            </div>
            <div class="field">
                <label>Marca *</label>
                <input type="text" id="editMarca" value="${escapeHtml(product.marca)}" required>
            </div>
            <div class="row-split">
                <div class="field">
                    <label>Categoría</label>
                    <input type="text" id="editCategoria" value="${escapeHtml(product.categoria || 'General')}">
                </div>
                <div class="field">
                    <label>Precio (USD) ≥ 0.01</label>
                    <input type="number" step="0.01" id="editPrecio" value="${product.precio}" required>
                </div>
            </div>
            <div class="field">
                <label>Stock (unidades) ≥ 0</label>
                <input type="number" id="editStock" value="${product.stock}" required>
            </div>
            <button type="submit" class="btn-update">💾 Guardar cambios</button>
            <button type="button" class="btn-cancel" id="cancelEditBtn">↩️ Cancelar y volver</button>
        </form>
    `;
    
    const editForm = document.getElementById('editForm');
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('editNombre').value.trim();
        const marca = document.getElementById('editMarca').value.trim();
        const categoria = document.getElementById('editCategoria').value.trim() || "General";
        const precioVal = parseFloat(document.getElementById('editPrecio').value);
        const stockVal = parseInt(document.getElementById('editStock').value, 10);
        
        if (!nombre || !marca) {
            showToast('❌ Nombre y marca son obligatorios', true);
            return;
        }
        if (isNaN(precioVal) || precioVal < 0.01) {
            showToast('⚠️ Precio debe ser al menos 0.01', true);
            return;
        }
        if (isNaN(stockVal) || stockVal < 0) {
            showToast('⚠️ Stock no puede ser negativo', true);
            return;
        }
        
        const updated = { nombre, marca, categoria, precio: precioVal, stock: stockVal };
        try {
            const response = await fetch(`${API_BASE}/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated)
            });
            if (!response.ok) {
                const errJson = await response.json().catch(() => ({}));
                throw new Error(errJson.message || 'Error en actualización');
            }
            showToast(`✅ Producto #${productId} actualizado correctamente`);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 900);
        } catch (error) {
            showToast(`Error: ${error.message}`, true);
        }
    });
    document.getElementById('cancelEditBtn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if(m === '&') return '&amp;';
        if(m === '<') return '&lt;';
        if(m === '>') return '&gt;';
        return m;
    });
}

loadProductAndRenderForm();