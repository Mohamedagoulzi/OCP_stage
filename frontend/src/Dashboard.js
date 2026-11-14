import React, { useState } from 'react';
import { 
  Menu, X, Home, Ticket, Monitor, Users, Wrench, BarChart3, Bell, Settings, LogOut,
  Search, ChevronDown, Clock, CheckCircle, AlertCircle, TrendingUp, TrendingDown,
  Star, Filter, Calendar, Download, RefreshCw, MoreVertical, ExternalLink,
  Printer, Wifi, HardDrive
} from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './styles/Dashboard.css';
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Mock data
  const stats = [
    {
      title: "Tickets Ouverts",
      value: "12",
      subtitle: "Dont 3 critiques",
      change: "+20%",
      trend: "up",
      icon: Ticket,
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    },
    {
      title: "Résolus Aujourd'hui",
      value: "45",
      subtitle: "Objectif: 40",
      change: "+12.5%",
      trend: "up",
      icon: CheckCircle,
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      title: "Temps Moyen",
      value: "2h 15min",
      subtitle: "SLA: 4h",
      change: "-15%",
      trend: "up",
      icon: Clock,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Satisfaction",
      value: "92%",
      subtitle: "Sur 120 avis",
      change: "+5%",
      trend: "up",
      icon: Star,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    }
  ];

  const tickets = [
    { id: "TIC-2024-156", equipment: "Dell Latitude 5520", problem: "Écran bleu - BSOD", user: "Marie D. - Compta", priority: "critical", tech: "Jean P.", status: "En cours", time: "45min" },
    { id: "TIC-2024-157", equipment: "HP LaserJet Pro", problem: "Bourrage papier", user: "Paul L. - RH", priority: "low", tech: "Sophie M.", status: "En attente", time: "10min" },
    { id: "TIC-2024-158", equipment: "iPhone 13 Pro", problem: "Email ne synchronise pas", user: "Director - Admin", priority: "high", tech: "Jean P.", status: "En cours", time: "1h 20min" },
    { id: "TIC-2024-159", equipment: "Cisco Switch", problem: "Ports non fonctionnels", user: "IT - Infrastructure", priority: "critical", tech: "Marc B.", status: "Planifié", time: "-" },
    { id: "TIC-2024-160", equipment: "Surface Pro 8", problem: "Tactile ne répond pas", user: "Lisa K. - Marketing", priority: "medium", tech: "Sophie M.", status: "En cours", time: "30min" },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: Home },
    { id: 'tickets', label: 'Tickets', icon: Ticket, badge: '12' },
    { id: 'equipment', label: 'Équipements', icon: Monitor },
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'technicians', label: 'Techniciens', icon: Wrench },
    { id: 'reports', label: 'Rapports', icon: BarChart3 },
    { id: 'alerts', label: 'Alertes', icon: Bell, badge: '3' },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  // Chart data
  const chartData = [
    { day: 'Lun', nouveaux: 15, resolus: 12, enAttente: 8 },
    { day: 'Mar', nouveaux: 18, resolus: 16, enAttente: 10 },
    { day: 'Mer', nouveaux: 12, resolus: 14, enAttente: 8 },
    { day: 'Jeu', nouveaux: 20, resolus: 15, enAttente: 13 },
    { day: 'Ven', nouveaux: 16, resolus: 18, enAttente: 11 },
    { day: 'Sam', nouveaux: 8, resolus: 10, enAttente: 9 },
    { day: 'Dim', nouveaux: 5, resolus: 6, enAttente: 8 }
  ];

  const pieData = [
    { name: 'Hardware', value: 40, color: '#3b82f6' },
    { name: 'Software', value: 30, color: '#10b981' },
    { name: 'Réseau', value: 20, color: '#f59e0b' },
    { name: 'Sécurité', value: 10, color: '#ef4444' }
  ];


  const topProblems = [
    { name: "Windows Update", count: 23, percentage: 23 },
    { name: "Imprimante réseau", count: 18, percentage: 18 },
    { name: "Réinitialisation MDP", count: 15, percentage: 15 },
    { name: "Outlook bloqué", count: 12, percentage: 12 },
    { name: "VPN lent", count: 10, percentage: 10 }
  ];
 

  const getPriorityLabel = (priority) => {
    switch(priority) {
      case 'critical': return 'Critique';
      case 'high': return 'Élevée';
      case 'medium': return 'Moyenne';
      case 'low': return 'Basse';
      default: return priority;
    }
  };

  return (
    <div className="dashboard-container">
  {/* Sidebar */}
  <div className={sidebarOpen ? "sidebar open" : "sidebar closed"}>
    <div className="sidebar-header">
      <div className="sidebar-header-content">
        <div className="logo-container">
          <div className="logo">
            <Monitor size={24} className="logo-icon" />
          </div>
          {sidebarOpen && <span className="sidebar-title">IT Support</span>}
        </div>
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </div>

    <nav className="sidebar-nav">
      {menuItems.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
          onClick={() => setActiveMenu(item.id)}
        >
          <div className="nav-item-content">
            <item.icon size={20} />
            {sidebarOpen && <span>{item.label}</span>}
          </div>
          {item.badge && sidebarOpen && (
            <span className="nav-badge">{item.badge}</span>
          )}
        </button>
      ))}
    </nav>

    <div className="sidebar-footer">
      <div className="user-info">
        {sidebarOpen && (
          <div className="user-details">
            <p className="user-name">Jean Dupont</p>
            <p className="user-role">Administrateur</p>
          </div>
        )}
        <button className="logout-btn">
          <LogOut size={20} />
        </button>
      </div>
    </div>
  </div>

  {/* Main Content */}
  <div className="main-content">
    <header className="header">
      <div className="header-content">
        <div>
          <h1 className="header-title">Tableau de Bord</h1>
          <p className="header-subtitle">Gestion des interventions informatiques</p>
        </div>
        <div className="header-actions">
          <button className="date-selector">
            <Calendar size={16} />
            <span>Aujourd'hui</span>
            <ChevronDown size={16} />
          </button>
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher un ticket..."
              className="search-input"
            />
          </div>
          <button className="notification-btn">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>
          <div className="user-avatar">JD</div>
        </div>
      </div>
    </header>

    <main className="main-wrapper">
      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div className={`stat-icon-container ${stat.textColor.replace('text-', '')}`}>
                <stat.icon size={24} />
              </div>
              <span className={`stat-trend ${stat.trend}`}>
                {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span>{stat.change}</span>
              </span>
            </div>
            <h3 className="stat-value">{stat.value}</h3>
            <p className="stat-title">{stat.title}</p>
            <p className="stat-subtitle">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Flux des Interventions</h3>
            <div className="chart-actions">
              <button>
                <Download size={18} />
              </button>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="today">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
              </select>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="nouveaux" fill="#14b8a6" name="Nouveaux" />
                <Bar dataKey="resolus" fill="#f59e0b" name="Résolus" />
                <Bar dataKey="enAttente" fill="#e5e7eb" name="En attente" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Répartition par Type</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div>
              <p>100%</p>
              <p>Total</p>
            </div>
          </div>
          <div className="pie-legend">
            {pieData.map((item, index) => (
              <div key={index} className="legend-item">
                <div>
                  <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                  <span className="legend-label">{item.name}</span>
                </div>
                <span className="legend-value">{item.value}%</span>
              </div>
            ))}
          </div>
          <div>
            <h4>Top Problèmes</h4>
            <div>
              {topProblems.slice(0, 3).map((problem, index) => (
                <div key={index}>
                  <span>{problem.name}</span>
                  <span>{problem.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="table-container">
        <div className="table-header">
          <div>
            <h3 className="table-title">Interventions en Cours</h3>
            <div className="table-actions">
              <button className="new-ticket-btn">
                <Ticket size={16} />
                <span>Nouveau Ticket</span>
              </button>
              <button>
                <Filter size={20} />
              </button>
              <button>
                <RefreshCw size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead className="table-head">
              <tr>
                <th className="table-header-cell">N° Ticket</th>
                <th className="table-header-cell">Équipement</th>
                <th className="table-header-cell">Problème</th>
                <th className="table-header-cell">Utilisateur</th>
                <th className="table-header-cell">Priorité</th>
                <th className="table-header-cell">Technicien</th>
                <th className="table-header-cell">Statut</th>
                <th className="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => (
                <tr key={index} className="table-row">
                  <td className="table-cell">{ticket.id}</td>
                  <td className="table-cell">
                    <div>
                      {ticket.equipment.includes('Dell') || ticket.equipment.includes('HP') || ticket.equipment.includes('Surface') ? (
                        <Monitor size={16} />
                      ) : ticket.equipment.includes('iPhone') ? (
                        <HardDrive size={16} />
                      ) : ticket.equipment.includes('LaserJet') ? (
                        <Printer size={16} />
                      ) : (
                        <Wifi size={16} />
                      )}
                      <span>{ticket.equipment}</span>
                    </div>
                  </td>
                  <td className="table-cell">{ticket.problem}</td>
                  <td className="table-cell">{ticket.user}</td>
                  <td className="table-cell">
                    <span className={`priority-badge priority-${ticket.priority}`}>
                      {getPriorityLabel(ticket.priority)}
                    </span>
                  </td>
                  <td className="table-cell">{ticket.tech}</td>
                  <td className="table-cell">
                    <div className="status-container">
                      {ticket.status === 'En cours' ? (
                        <>
                          <div className="status-dot in-progress"></div>
                          <span>{ticket.status}</span>
                          <span>({ticket.time})</span>
                        </>
                      ) : ticket.status === 'En attente' ? (
                        <>
                          <div className="status-dot waiting"></div>
                          <span>{ticket.status}</span>
                        </>
                      ) : (
                        <>
                          <div className="status-dot planned"></div>
                          <span>{ticket.status}</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div>
                      <button>
                        <ExternalLink size={16} />
                      </button>
                      <button>
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <div className="action-card critical">
          <div>
            <AlertCircle size={20} />
            <div>
              <p className="action-title">3 Tickets Critiques</p>
              <p className="action-description">Nécessitent une attention immédiate</p>
            </div>
          </div>
        </div>
        <div className="action-card warning">
          <div>
            <Clock size={20} />
            <div>
              <p className="action-title">5 En Retard</p>
              <p className="action-description">Dépassent le SLA défini</p>
            </div>
          </div>
        </div>
        <div className="action-card success">
          <div>
            <CheckCircle size={20} />
            <div>
              <p className="action-title">87% Dans les Délais</p>
              <p className="action-description">Performance SLA ce mois</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
  );
};

export default Dashboard;