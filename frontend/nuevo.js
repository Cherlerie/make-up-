const API_BASE = '/api/productos';
const form = document.getElementById('productForm');
const toast = document.getElementById('toastMsg');

function showMessage(text, isError = false) {
    toast.textContent = text;
    toast.style.backgroundColor = isError ? '#922b21' : '#2c5f2d';
    toast.style.opacity = '1';
    toast.style.visibility = 'visible';
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.visibility = 'hidden';
    }, 2500);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const marca = document.getElementById('marca').value.trim();
    const categoria = document.getElementById('categoria').value.trim() || "General";
    const precioRaw = document.getElementById('precio').value;
    const stockRaw = document.getElementById('stock').value;
    
    if (!nombre || !marca) {
        showMessage('❌ Nombre y marca son obligatorios', true);
        return;
    }
    const precio = parseFloat(precioRaw);
    const stock = parseInt(stockRaw, 10);
    if (isNaN(precio) || precio < 0.01) {
        showMessage('⚠️ Precio inválido (mínimo 0.01 USD)', true);
        return;
    }
    if (isNaN(stock) || stock < 0) {
        showMessage('⚠️ El stock debe ser un número mayor o igual a 0', true);
        return;
    }
    
    const newProduct = { nombre, marca, categoria, precio, stock };
    
    try {
        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        });
        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.message || 'Error al crear');
        }
        showMessage(`✔️ "${nombre}" agregado con éxito!`);
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } catch (error) {
        console.error(error);
        showMessage(`Error: ${error.message}`, true);
    }
});

document.getElementById('backToList').addEventListener('click', () => {
    window.location.href = 'index.html';
});