// Spanish teams matches data and functionality
const matchesModule = {
    teams: [
        { name: 'Real Madrid', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' },
        { name: 'Barcelona', logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' },
        { name: 'Atletico Madrid', logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/9/93/Logo_Atl%C3%A9tico_Madrid_2017.svg/670px-Logo_Atl%C3%A9tico_Madrid_2017.svg.png?20190512232133' },
        { name: 'Sevilla', logo: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg' },
        { name: 'Valencia', logo: 'https://upload.wikimedia.org/wikipedia/en/c/ce/Valenciacf.svg' },
        { name: 'Athletic Bilbao', logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/3/34/Logo_Athletic_Club_Bilbao.svg/768px-Logo_Athletic_Club_Bilbao.svg.png?20241016224459' },
        { name: 'Real Sociedad', logo: 'https://upload.wikimedia.org/wikipedia/sco/thumb/f/f1/Real_Sociedad_logo.svg/231px-Real_Sociedad_logo.svg.png?20200105221348' },
        { name: 'Villarreal', logo: 'https://upload.wikimedia.org/wikipedia/fr/7/70/Villarreal_CF_logo.svg' },
        { name: 'Getafe', logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/c/ca/Getafe_%28logo%29.svg/430px-Getafe_%28logo%29.svg.png?20200607234151' },
        { name: 'Granada', logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/5/5f/Logo_Granada_CF.svg/402px-Logo_Granada_CF.svg.png?20190513001553' },
        { name: 'Osasuna', logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/2/25/Logo_CA_Osasuna_2024.svg/671px-Logo_CA_Osasuna_2024.svg.png?20240801113501' }
    ],

    generateMatches() {
        const matches = [];
        const teams = [...this.teams];
        
        while (teams.length > 1) {
            const homeTeam = teams.splice(Math.floor(Math.random() * teams.length), 1)[0];
            const awayTeam = teams.splice(Math.floor(Math.random() * teams.length), 1)[0];
            
            matches.push({
                homeTeam,
                awayTeam,
                date: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000),
                odds: {
                    home: (Math.random() * 3 + 1).toFixed(2),
                    draw: (Math.random() * 3 + 2).toFixed(2),
                    away: (Math.random() * 3 + 1).toFixed(2)
                }
            });
        }

        return matches;
    },

    displayMatches() {
        const matches = this.generateMatches();
        const matchesGrid = document.getElementById('matchesGrid');
        
        matchesGrid.innerHTML = matches.map(match => `
            <div class="match-card">
                <div class="match-date">${utils.formatDate(match.date)}</div>
                <div class="team-logos">
                    <img src="${match.homeTeam.logo}" alt="${match.homeTeam.name}" class="team-logo">
                    <span>VS</span>
                    <img src="${match.awayTeam.logo}" alt="${match.awayTeam.name}" class="team-logo">
                </div>
                <div class="team-names">
                    <span>${match.homeTeam.name}</span>
                    <span>${match.awayTeam.name}</span>
                </div>
                <div class="match-odds">
                    <button onclick="betModule.placeBetFromMatch('${match.homeTeam.name}', ${match.odds.home})">
                        ${match.odds.home}
                    </button>
                    <button onclick="betModule.placeBetFromMatch('Draw', ${match.odds.draw})">
                        ${match.odds.draw}
                    </button>
                    <button onclick="betModule.placeBetFromMatch('${match.awayTeam.name}', ${match.odds.away})">
                        ${match.odds.away}
                    </button>
                </div>
            </div>
        `).join('');
    }
};
