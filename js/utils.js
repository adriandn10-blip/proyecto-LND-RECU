// Utility functions
const utils = {
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    },

    formatDate: (date) => {
        return new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    },

    showMessage: (message, type = 'info') => {
        modalModule.show(`
            <div class="message ${type}">
                <p>${message}</p>
            </div>
        `);
    }
};