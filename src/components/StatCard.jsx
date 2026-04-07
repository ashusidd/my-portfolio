// src/components/StatCard.jsx

function StatCard({ label, value, iconColor }) {
    return (
        <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: iconColor }}></div>
            <div className="stat-info">
                <span className="stat-label">{label}</span>
                <h2 className="stat-value">{value}</h2>
            </div>
        </div>
    );
}

export default StatCard;