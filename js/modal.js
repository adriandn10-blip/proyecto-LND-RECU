// Modal functionality
const modalModule = {
    modal: null,
    closeBtn: null,

    init() {
        this.modal = document.getElementById('modal');
        this.closeBtn = document.querySelector('.close-modal');
        
        this.closeBtn.onclick = () => this.hide();
        window.onclick = (e) => {
            if (e.target === this.modal) this.hide();
        };
    },

    show(content) {
        document.getElementById('modalContent').innerHTML = content;
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    },

    hide() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};