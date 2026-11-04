/**
 * TOKO NAJMA KOMPUTER - AUTHENTICATION & SESSION MANAGEMENT
 * --------------------------------------------------------
 * File: auth.js
 * Handling authentication, session storage, and GAS URL configuration.
 */

// Default Google Apps Script URL Endpoint
const DEFAULT_GAS_URL = "https://script.google.com/macros/s/AKfycbxky5w54cYs0Je77j33ikL2Vi-3NXv2Wy4OKx8f31j4VhqvLc_GNquax--PJkGq05yQ/exec";

// Inisialisasi konfigurasi otomatis saat file dimuat
(function initAuthSettings() {
    // Simpan URL default GAS jika belum tersimpan di browser (localStorage)
    if (!localStorage.getItem('najma_gas_url')) {
        localStorage.setItem('najma_gas_url', DEFAULT_GAS_URL);
    }
})();

/**
 * Memeriksa status sesi login dari localStorage
 */
function checkAuthSession() {
    const savedKasir = localStorage.getItem('najma_active_kasir');
    const loginModal = document.getElementById('login-modal');
    
    if (savedKasir) {
        window.activeKasir = savedKasir;
        const headerKasir = document.getElementById('header-kasir-name');
        const recKasir = document.getElementById('rec-kasir');
        
        if (headerKasir) headerKasir.innerText = savedKasir;
        if (recKasir) recKasir.innerText = savedKasir;
        if (loginModal) loginModal.classList.add('hidden');
    } else {
        if (loginModal) loginModal.classList.remove('hidden');
    }
}

/**
 * Menangani form login kasir
 * Akun Default: username 'admin', password '12345'
 */
function handleLogin(e) {
    if (e && e.preventDefault) e.preventDefault();
    
    const uInput = document.getElementById('login-username');
    const pInput = document.getElementById('login-password');
    const loginModal = document.getElementById('login-modal');
    
    const u = uInput ? uInput.value.trim() : '';
    const p = pInput ? pInput.value.trim() : '';

    if (u === 'admin' && p === '12345') {
        window.activeKasir = u;
        localStorage.setItem('najma_active_kasir', u);
        
        const headerKasir = document.getElementById('header-kasir-name');
        const recKasir = document.getElementById('rec-kasir');
        
        if (headerKasir) headerKasir.innerText = u;
        if (recKasir) recKasir.innerText = u;
        if (loginModal) loginModal.classList.add('hidden');
        
        if (typeof showToast === 'function') {
            showToast('Login Kasir Berhasil!');
        }
    } else {
        if (typeof showToast === 'function') {
            showToast('Username atau password salah!', true);
        } else {
            alert('Username atau password salah!');
        }
    }
}

/**
 * Menangani logout kasir
 */
function logoutKasir() {
    localStorage.removeItem('najma_active_kasir');
    const loginModal = document.getElementById('login-modal');
    if (loginModal) loginModal.classList.remove('hidden');
    
    if (typeof showToast === 'function') {
        showToast('Anda telah logout');
    }
}