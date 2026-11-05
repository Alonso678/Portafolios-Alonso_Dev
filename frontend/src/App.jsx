import React, { useState, useEffect } from 'react';
import { 
  Terminal, Server, Database, Code, Shield, Cpu, ExternalLink, 
  Mail, Phone, MapPin, Linkedin, Download, Plus, Trash2, Edit3, 
  Check, Sparkles, Building2, Layers, Briefcase, Award, RefreshCw, Save, Upload, Lock, Unlock, X
} from 'lucide-react';

const INITIAL_DATA = {
  profile: {
    name: "JOSÉ ALONSO ORTIZ SALVADOR",
    title: "DESARROLLADOR JAVA | ESPECIALISTA EN MICROSERVICIOS | SECTOR BANCARIO",
    email: "darkalon678@gmail.com",
    phone: "771 3318966",
    location: "Mixquiahuala de Juárez, Hidalgo, MX",
    linkedin: "linkedin.com/in/jose-alonso-ortiz-salvador",
    summary: "Analista de sistemas con habilidades sólidas en programación y solución de problemas técnicos en entornos de tecnologías de la información. Especializado en el ecosistema Java y arquitecturas orientadas a microservicios. Alta capacidad de adaptación, calidad de código y resolución de incidencias complejas.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
  },
  skills: {
    languages: ["Java", "JavaScript", "HTML5", "CSS3", "XML"],
    frameworks: ["Spring Boot", "Spring Data", "Spring Security", "Spring Cloud", "MVC", "Angular", "PrimeFaces"],
    databases: ["Oracle", "MySQL", "PostgreSQL"],
    tools: ["GitLab", "Maven", "SonarQube", "Postman", "Jira", "Dynatrace", "Docker", "Kubernetes", "OpenShift", "Jenkins", "Kafka", "Flyway"]
  },
  experiences: [
    {
      id: 1,
      role: "Jefe Administrativo 'C'",
      company: "ADIP (Agencia Digital de Innovación Pública)",
      period: "Oct 2025 - Oct 2026",
      location: "CDMX",
      description: "Implementación de ajustes y correcciones a diferentes proyectos (LLAVE, SUAC311, SIAPEM). Análisis y resolución de errores en pantallas de ambiente Develop. Versionado y control de cambios con GitLab y estandarización de arquitectura.",
      techs: ["Java EE", "PrimeFaces", "Maven", "API REST", "GitLab", "Postman"]
    },
    {
      id: 2,
      role: "Desarrollador Java",
      company: "MTI CONSULTORÍA",
      period: "Mar 2023 - Sept 2025",
      location: "Querétaro",
      description: "Migración de servicios del sistema administrativo estatal SIAFE (REGER V3). Creación y consumo de microservicios REST. Análisis y resolución de errores en pantallas de ambiente DEV.",
      techs: ["Java", "Spring Boot", "Microservicios", "REST", "GitLab", "Postman"]
    },
    {
      id: 3,
      role: "Desarrollador Java",
      company: "GRUPO SALINAS - BANCO AZTECA",
      period: "Jun 2022 - Ene 2023",
      location: "CDMX",
      description: "Participación en proyectos bancarios (Core Captación). Migración de servicios bancarios, incluyendo refactorización de APIs. Análisis y resolución de incidencias en distintos ambientes.",
      techs: ["Java", "Spring Boot", "Angular", "Oracle", "Scrum", "Dynatrace"]
    }
  ]
};

export default function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('alonso_portfolio_data');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [editMode, setEditMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isSavingDb, setIsSavingDb] = useState(false);
  const [newTech, setNewTech] = useState('');
  const [techCategory, setTechCategory] = useState('frameworks');

  useEffect(() => {
    localStorage.setItem('alonso_portfolio_data', JSON.stringify(data));
  }, [data]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Credenciales de acceso protegido para el Administrador
    if (usernameInput === 'alonso' && passwordInput === 'admin2026') {
      setIsAuthenticated(true);
      setEditMode(true);
      setShowLoginModal(false);
      setUsernameInput('');
      setPasswordInput('');
      setLoginError('');
    } else {
      setLoginError('Credenciales incorrectas. Acceso restringido.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEditMode(false);
  };

  const handleProfileChange = (field, value) => {
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, [field]: value }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleProfileChange('imageUrl', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExperienceChange = (id, field, value) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const handleAddTech = () => {
    if (!newTech.trim()) return;
    setData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [techCategory]: [...prev.skills[techCategory], newTech.trim()]
      }
    }));
    setNewTech('');
  };

  const handleDeleteTech = (category, techToDelete) => {
    setData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter(t => t !== techToDelete)
      }
    }));
  };

  const handleDeleteExperience = (id) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const handleAddExperience = () => {
    const newExp = {
      id: Date.now(),
      role: "Nuevo Puesto",
      company: "Empresa",
      period: "2026 - Presente",
      location: "CDMX",
      description: "Descripción del puesto y responsabilidades...",
      techs: ["Java", "Spring Boot", "Flyway"]
    };
    setData(prev => ({ ...prev, experiences: [newExp, ...prev.experiences] }));
  };

  const saveToDatabase = async () => {
    setIsSavingDb(true);
    try {
      for (const exp of data.experiences) {
        const payload = {
          role: exp.role,
          company: exp.company,
          period: exp.period,
          location: exp.location,
          description: exp.description,
          techs: Array.isArray(exp.techs) ? exp.techs.join(', ') : exp.techs
        };

        const isNew = exp.id > 1000000;
        const url = isNew ? 'http://localhost:8080/api/experiences' : `http://localhost:8080/api/experiences/${exp.id}`;
        const method = isNew ? 'POST' : 'PUT';

        await fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      localStorage.setItem('alonso_portfolio_data', JSON.stringify(data));
      alert('¡Experiencias sincronizadas en PostgreSQL y Perfil actualizado exitosamente!');
    } catch (error) {
      console.warn('Backend no disponible, guardando solo en localStorage:', error);
      localStorage.setItem('alonso_portfolio_data', JSON.stringify(data));
      alert('¡Datos guardados en localStorage! (Verifica la conexión con Spring Boot en el puerto 8080).');
    } finally {
      setIsSavingDb(false);
    }
  };

  const downloadPDF = () => {
    setIsGeneratingPdf(true);
    const element = document.getElementById('cv-pdf-content');
    const opt = {
      margin:       [0.3, 0.3, 0.3, 0.3],
      filename:     `CV_Jose_Alonso_Ortiz_${new Date().toISOString().slice(0,10)}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    if (window.html2pdf) {
      window.html2pdf().set(opt).from(element).save().then(() => {
        setIsGeneratingPdf(false);
      }).catch(err => {
        console.error(err);
        setIsGeneratingPdf(false);
      });
    } else {
      alert("Cargando generador PDF...");
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans relative overflow-x-hidden">
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      <header className="sticky top-0 z-50 bg-slate-950/70 border-b border-cyan-500/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/20">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              ALONSO.DEV
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
              Flyway Integrated
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={saveToDatabase}
                  disabled={isSavingDb}
                  className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs flex items-center space-x-1.5 shadow-lg shadow-cyan-500/30 transition-all"
                >
                  {isSavingDb ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Guardar en BD</span>
                </button>

                <button
                  onClick={() => setEditMode(!editMode)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10"
                >
                  {editMode ? 'Ocultar Edición' : 'Mostrar Edición'}
                </button>

                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 flex items-center space-x-1"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Cerrar Sesión</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:border-cyan-500/50 flex items-center space-x-1.5 transition-all"
              >
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Acceso Admin</span>
              </button>
            )}

            <button
              onClick={downloadPDF}
              disabled={isGeneratingPdf}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
            >
              {isGeneratingPdf ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              <span>Descargar CV PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Modal de Login Protegido */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Panel de Administración</h3>
                <p className="text-xs text-slate-400">Ingrese credenciales para editar el portafolio</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-cyan-400 block mb-1">Usuario:</label>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:border-cyan-500 outline-none"
                  placeholder="Usuario admin"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono text-cyan-400 block mb-1">Contraseña:</label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:border-cyan-500 outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>

              {loginError && (
                <p className="text-xs text-red-400 bg-red-950/40 border border-red-500/30 p-2 rounded">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold rounded-lg text-xs shadow-lg hover:opacity-95 transition-all mt-2"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        <section className="bg-slate-900/60 border border-cyan-500/20 rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative group flex-shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <img 
                src={data.profile.imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"} 
                alt="Foto Perfil"
                className="relative w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-2 border-cyan-400 shadow-2xl"
              />
            </div>

            <div className="flex-1 text-center md:text-left space-y-3 w-full">
              {editMode && isAuthenticated ? (
                <div className="space-y-3 bg-slate-950/50 p-4 rounded-xl border border-amber-500/30">
                  <div>
                    <label className="text-[10px] text-cyan-400 font-mono block mb-1">Cargar Imagen desde Archivo Local:</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full bg-slate-900 border border-cyan-500/50 rounded p-1.5 text-xs text-slate-300 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-cyan-500/20 file:text-cyan-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-cyan-400 font-mono block mb-1">Nombre Completo:</label>
                    <input
                      type="text"
                      value={data.profile.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      className="w-full bg-slate-900 border border-cyan-500/50 rounded p-2 text-sm font-bold text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-cyan-400 font-mono block mb-1">Título Profesional:</label>
                    <input
                      type="text"
                      value={data.profile.title}
                      onChange={(e) => handleProfileChange('title', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-cyan-400 font-mono block mb-1">Resumen Profesional:</label>
                    <textarea
                      value={data.profile.summary}
                      onChange={(e) => handleProfileChange('summary', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-300 h-20"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
                    <input
                      type="text"
                      value={data.profile.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      placeholder="Correo electrónico"
                      className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-cyan-300"
                    />
                    <input
                      type="text"
                      value={data.profile.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      placeholder="Teléfono"
                      className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-emerald-300"
                    />
                    <input
                      type="text"
                      value={data.profile.location}
                      onChange={(e) => handleProfileChange('location', e.target.value)}
                      placeholder="Ubicación"
                      className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-amber-300"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                    <Sparkles className="w-3 h-3" />
                    <span>Senior Enterprise Java Engineer</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                    {data.profile.name}
                  </h1>
                  <p className="text-sm md:text-base font-semibold text-cyan-400">
                    {data.profile.title}
                  </p>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-3xl">
                    {data.profile.summary}
                  </p>
                </>
              )}

              {(!editMode || !isAuthenticated) && (
                <div className="flex flex-wrap gap-3 pt-2 justify-center md:justify-start text-xs text-slate-300">
                  <span className="flex items-center space-x-1.5 bg-slate-900/80 px-3 py-1.5 rounded-md border border-slate-800">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{data.profile.email}</span>
                  </span>
                  <span className="flex items-center space-x-1.5 bg-slate-900/80 px-3 py-1.5 rounded-md border border-slate-800">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{data.profile.phone}</span>
                  </span>
                  <span className="flex items-center space-x-1.5 bg-slate-900/80 px-3 py-1.5 rounded-md border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{data.profile.location}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center space-x-2 text-white">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>Stack Tecnológico & Habilidades</span>
          </h2>

          {editMode && isAuthenticated && (
            <div className="p-4 bg-slate-900/90 rounded-xl border border-amber-500/30 flex flex-wrap gap-2 items-center">
              <select 
                value={techCategory} 
                onChange={(e) => setTechCategory(e.target.value)}
                className="bg-slate-800 text-xs border border-slate-700 rounded p-2 text-slate-200"
              >
                <option value="languages">Lenguajes</option>
                <option value="frameworks">Frameworks</option>
                <option value="databases">Bases de Datos</option>
                <option value="tools">Herramientas & Cloud</option>
              </select>
              <input
                type="text"
                placeholder="Nueva tecnología..."
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded p-2 text-xs flex-1 text-slate-200 min-w-[200px]"
              />
              <button 
                onClick={handleAddTech}
                className="px-3 py-2 bg-amber-500 text-slate-950 font-bold rounded text-xs flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(data.skills).map(([cat, list]) => (
              <div key={cat} className="bg-slate-900/40 border border-slate-800 hover:border-cyan-500/30 p-4 rounded-xl backdrop-blur-md transition-all">
                <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 font-semibold flex justify-between items-center">
                  <span>{cat}</span>
                  <span className="text-[10px] text-slate-500">{list.length} items</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {list.map(tech => (
                    <span key={tech} className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-900/90 text-xs text-slate-300 border border-slate-800 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors">
                      <span>{tech}</span>
                      {editMode && isAuthenticated && (
                        <button onClick={() => handleDeleteTech(cat, tech)} className="text-red-400 hover:text-red-300 ml-1">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center space-x-2 text-white">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              <span>Experiencia Profesional</span>
            </h2>

            {editMode && isAuthenticated && (
              <button
                onClick={handleAddExperience}
                className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-semibold flex items-center space-x-1 hover:bg-emerald-500/30"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Puesto</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="bg-slate-900/40 border border-slate-800 hover:border-emerald-500/30 p-6 rounded-xl backdrop-blur-md transition-all relative group">
                {editMode && isAuthenticated ? (
                  <div className="space-y-3 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleExperienceChange(exp.id, 'role', e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs font-bold text-white"
                        placeholder="Puesto"
                      />
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-emerald-400"
                        placeholder="Empresa"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => handleExperienceChange(exp.id, 'period', e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-cyan-300"
                        placeholder="Periodo (ej. 2025 - Presente)"
                      />
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => handleExperienceChange(exp.id, 'location', e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-slate-300"
                        placeholder="Ubicación"
                      />
                    </div>
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-300 h-20"
                      placeholder="Descripción de responsabilidades..."
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                          <span>{exp.role}</span>
                          <span className="text-xs text-emerald-400 font-mono font-normal">@ {exp.company}</span>
                        </h3>
                        <p className="text-xs text-slate-400 flex items-center space-x-2">
                          <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{exp.location}</span>
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
                      {exp.description}
                    </p>
                  </>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {(Array.isArray(exp.techs) ? exp.techs : (exp.techs || '').split(',')).map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-cyan-950/40 text-[11px] text-cyan-300 border border-cyan-800/40">
                      {t.trim()}
                    </span>
                  ))}
                </div>

                {editMode && isAuthenticated && (
                  <button
                    onClick={() => handleDeleteExperience(exp.id)}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-300 p-1 bg-slate-900 rounded border border-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Plantilla con Formato de Diseñador Profesional para la descarga en PDF */}
      <div className="hidden">
        <div id="cv-pdf-content" className="p-10 bg-white text-slate-800 font-sans text-xs leading-relaxed max-w-[800px] mx-auto">
          
          <div className="border-b-2 border-slate-900 pb-6 mb-6 flex items-center justify-between">
            <div className="space-y-1.5 flex-1 pr-4">
              <h1 className="text-2xl font-black text-slate-900 tracking-wider uppercase">{data.profile.name}</h1>
              <p className="text-xs font-bold text-cyan-800 tracking-wide uppercase">{data.profile.title}</p>
              <div className="text-[10px] text-slate-600 pt-1 flex flex-wrap gap-4 font-medium">
                <span className="flex items-center gap-1">✉️ {data.profile.email}</span>
                <span className="flex items-center gap-1">📞 {data.profile.phone}</span>
                <span className="flex items-center gap-1">📍 {data.profile.location}</span>
              </div>
            </div>
            {data.profile.imageUrl && (
              <div className="flex-shrink-0">
                <img 
                  src={data.profile.imageUrl} 
                  alt="Foto Perfil" 
                  className="w-24 h-24 rounded-full object-cover border-2 border-slate-900 shadow-md"
                />
              </div>
            )}
          </div>

          <div className="mb-6 bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">
              Resumen Profesional
            </h2>
            <p className="text-[11px] text-slate-700 leading-normal">{data.profile.summary}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-800"></span> Experiencia Profesional
            </h2>
            <div className="space-y-4">
              {data.experiences.map(exp => (
                <div key={exp.id} className="relative pl-3 border-l border-slate-200">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900 text-[11px]">
                      {exp.role} <span className="text-cyan-800 font-semibold">@ {exp.company}</span>
                    </h3>
                    <span className="text-slate-500 font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-700 leading-normal mb-1.5">{exp.description}</p>
                  <p className="text-[9px] text-slate-600 font-medium">
                    <span className="text-slate-900 font-bold">Stack:</span> {Array.isArray(exp.techs) ? exp.techs.join(', ') : exp.techs}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1.5 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-800"></span> Stack Tecnológico & Habilidades
            </h2>
            <div className="grid grid-cols-2 gap-3 text-[10px]">
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <strong className="text-slate-900 block mb-1 uppercase text-[9px] tracking-wider text-cyan-800">Lenguajes</strong> 
                <span className="text-slate-700">{data.skills.languages.join(', ')}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <strong className="text-slate-900 block mb-1 uppercase text-[9px] tracking-wider text-cyan-800">Frameworks</strong> 
                <span className="text-slate-700">{data.skills.frameworks.join(', ')}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <strong className="text-slate-900 block mb-1 uppercase text-[9px] tracking-wider text-cyan-800">Bases de Datos</strong> 
                <span className="text-slate-700">{data.skills.databases.join(', ')}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <strong className="text-slate-900 block mb-1 uppercase text-[9px] tracking-wider text-cyan-800">Herramientas & Cloud</strong> 
                <span className="text-slate-700">{data.skills.tools.join(', ')}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}