const API_BASE = '/api/productos';
const tbody = document.getElementById('tableBody');
const filterMarca = document.getElementById('filterMarca');
const filterCategoria = document.getElementById('filterCategoria');
const clearBtn = document.getElementById('clearFiltersBtn');
const goToAddBtn = document.getElementById('goToAddBtn');
const toastEl = document.getElementById('toast');

let allProducts = [];

function showToast(message, isError = false) {
    toastEl.textContent = message;
    toastEl.style.backgroundColor = isError ? '#922b21' : '#1e2a1b';
    toastEl.style.opacity = '1';
    toastEl.style.visibility = 'visible';
    setTimeout(() => {
        toastEl.style.opacity = '0';
        toastEl.style.visibility = 'hidden';
    }, 2800);
}

async function fetchProducts() {
    try {
        const response = await fetch(API_BASE);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        allProducts = Array.isArray(data) ? data : (data.products || []);
        applyFilters();
    } catch (error) {
        console.error("Error fetching products:", error);
        tbody.innerHTML = `<tr class="empty-row"><td colspan="7">⚠️ Error al cargar datos. ¿API levantada?</td></tr>`;
        showToast("Error conectando con el servidor", true);
    }
}

function applyFilters() {
    let filtered = [...allProducts];
    const marcaFilter = filterMarca.value.trim().toLowerCase();
    const catFilter = filterCategoria.value.trim().toLowerCase();
    
    if (marcaFilter) {
        filtered = filtered.filter(p => p.marca && p.marca.toLowerCase().includes(marcaFilter));
    }
    if (catFilter) {
        filtered = filtered.filter(p => p.categoria && p.categoria.toLowerCase().includes(catFilter));
    }
    renderTable(filtered);
}

function renderTable(productsArray) {
    if (!productsArray.length) {
        tbody.innerHTML = `<tr class="empty-row"><td colspan="7">🛍️ No hay productos con esos filtros.</td></tr>`;
        return;
    }
    tbody.innerHTML = productsArray.map(prod => `
        <tr data-id="${prod.id}">
            <td>${prod.id}</td>
            <td><strong>${escapeHtml(prod.nombre)}</strong></td>
            <td>${escapeHtml(prod.marca)}</td>
            <td><span class="badge-cat">${escapeHtml(prod.categoria || 'General')}</span></td>
            <td>$${parseFloat(prod.precio).toFixed(2)}</td>
            <td>${prod.stock} uds</td>
            <td class="actions">
                <button class="btn-edit" data-id="${prod.id}">✏️ Editar</button>
                <button class="btn-delete" data-id="${prod.id}">🗑️ Eliminar</button>
            </td>
        </tr>
    `).join('');
    
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            window.location.href = `editar.html?id=${id}`;
        });
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-id');
            if (confirm('¿Eliminar este producto permanentemente?')) {
                await deleteProduct(id);
            }
        });
    });
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Error al eliminar');
        showToast(`✅ Producto #${id} eliminado correctamente`);
        await fetchProducts();
    } catch (err) {
        console.error(err);
        showToast(`❌ No se pudo eliminar: ${err.message}`, true);
    }
}

filterMarca.addEventListener('input', () => applyFilters());
filterCategoria.addEventListener('input', () => applyFilters());
clearBtn.addEventListener('click', () => {
    filterMarca.value = '';
    filterCategoria.value = '';
    applyFilters();
});
goToAddBtn.addEventListener('click', () => {
    window.location.href = 'nuevo.html';
});

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

fetchProducts();