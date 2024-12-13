// Betting functionality
const betModule = {
    bets: JSON.parse(localStorage.getItem('bets')) || [],

    createBet() {
        const name = document.getElementById('betName').value;
        const amount = document.getElementById('betAmount').value;
        const category = document.getElementById('betCategory').value;

        if (!name || !amount || !category) {
            utils.showMessage('Please fill all fields', 'error');
            return;
        }

        const bet = {
            id: Date.now(),
            name,
            amount,
            category,
            date: new Date().toISOString()
        };

        this.bets.push(bet);
        this.saveBets();
        this.displayBets();
        this.clearForm();
        utils.showMessage('Bet placed successfully!', 'success');
    },

    placeBetFromMatch(team, odds) {
        modalModule.show(`
            <h3>Place Bet on ${team}</h3>
            <form onsubmit="betModule.submitMatchBet(event, '${team}', ${odds})">
                <div class="form-group">
                    <label>Amount (€)</label>
                    <input type="number" id="matchBetAmount" required min="1">
                </div>
                <p>Potential Win: <span id="potentialWin">0.00</span>€</p>
                <button type="submit">Place Bet</button>
            </form>
        `);

        document.getElementById('matchBetAmount').addEventListener('input', (e) => {
            const potentialWin = (e.target.value * odds).toFixed(2);
            document.getElementById('potentialWin').textContent = potentialWin;
        });
    },

    submitMatchBet(e, team, odds) {
        e.preventDefault();
        const amount = document.getElementById('matchBetAmount').value;
        
        const bet = {
            id: Date.now(),
            name: `Bet on ${team}`,
            amount,
            category: 'Match',
            odds,
            potentialWin: (amount * odds).toFixed(2),
            date: new Date().toISOString()
        };

        this.bets.push(bet);
        this.saveBets();
        this.displayBets();
        modalModule.hide();
        utils.showMessage('Match bet placed successfully!', 'success');
    },

    deleteBet(id) {
        this.bets = this.bets.filter(bet => bet.id !== id);
        this.saveBets();
        this.displayBets();
        utils.showMessage('Bet deleted successfully!', 'info');
    },

    editBet(id) {
        const bet = this.bets.find(bet => bet.id === id);
        
        if (bet) {
            modalModule.show(`
                <h3>Edit Bet Amount</h3>
                <form onsubmit="betModule.submitEditedBet(event, ${id})">
                    <div class="form-group">
                        <label>Amount (€)</label>
                        <input type="number" id="editBetAmount" value="${bet.amount}" required min="1">
                    </div>
                    <button type="submit">Save Changes</button>
                </form>
            `);
        }
    },

    submitEditedBet(e, id) {
        e.preventDefault();
        const amount = document.getElementById('editBetAmount').value;

        const betIndex = this.bets.findIndex(bet => bet.id === id);

        if (betIndex !== -1) {
            // Solo se actualiza la cantidad
            this.bets[betIndex] = {
                ...this.bets[betIndex],
                amount,  // Solo modificamos la cantidad
                date: new Date().toISOString()
            };
            
            this.saveBets();
            this.displayBets();
            modalModule.hide();
            utils.showMessage('Bet amount updated successfully!', 'success');
        }
    },

    saveBets() {
        localStorage.setItem('bets', JSON.stringify(this.bets));
    },

    displayBets() {
        const betsList = document.getElementById('betsList');
        betsList.innerHTML = this.bets.map(bet => `
            <div class="bet-card">
                <div>
                    <h3>${bet.name}</h3>
                    <p>Amount: ${utils.formatCurrency(bet.amount)}</p>
                    ${bet.odds ? `<p>Potential Win: ${utils.formatCurrency(bet.potentialWin)}</p>` : ''}
                    <p>Category: ${bet.category}</p>
                    <small>${utils.formatDate(bet.date)}</small>
                </div>
                <div>
                    <button onclick="betModule.deleteBet(${bet.id})">Delete</button>
                    <button onclick="betModule.editBet(${bet.id})">Edit Amount</button>
                </div>
            </div>
        `).join('');
    },

    clearForm() {
        document.getElementById('betName').value = '';
        document.getElementById('betAmount').value = '';
        document.getElementById('betCategory').value = '';
    }
};
