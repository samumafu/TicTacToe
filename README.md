# 🎮 Tic-Tac-Toe: Juego Interactivo en Línea

## 📋 Descripción del Proyecto

Este es un juego de **Triqui (Tic-Tac-Toe)** desarrollado con HTML, CSS y JavaScript puro. Es una implementación completa y moderna del clásico juego de dos jugadores, perfecto para entretenimiento rápido y práctica de desarrollo web.

**Plataforma:** Desarrollado en **GitHub Codespaces** (VS Code basado en la nube)

---

## ✨ Características

### 🎯 Funcionalidades Principales
- ✅ **Juego completo de dos jugadores** (X vs O)
- ✅ **Detección automática de ganador** con resaltado visual
- ✅ **Detección de empate**
- ✅ **Marcador persistente** durante toda la sesión
- ✅ **Interfaz responsiva** y moderna
- ✅ **Retroalimentación visual clara** del estado del juego

### 🎨 Diseño y UX
- Interfaz limpia y minimalista
- Colores distintivos para cada jugador
- Animaciones suaves en transiciones
- Indicador visual del jugador activo
- Diseño móvil-amigable (responsive)

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito |
|-----------|-----------|
| **HTML5** | Estructura semántica |
| **CSS3** | Estilos modernos (Grid, Flexbox, transiciones) |
| **JavaScript (Vanilla)** | Lógica del juego, manejo de eventos |
| **GitHub Codespaces** | Plataforma de desarrollo |

---

## 📁 Estructura del Proyecto

```
TicTacToe/
├── index.html       # Estructura HTML del juego
├── style.css        # Estilos y diseño
├── script.js        # Lógica del juego
└── README.md        # Este archivo
```

---

## 🚀 Cómo Usar

### Opción 1: Abrir en GitHub Codespaces
1. Ve al repositorio: [samumafu/TicTacToe](https://github.com/samumafu/TicTacToe)
2. Haz clic en "Code" > "Codespaces" > "Create codespace on main"
3. Espera a que se cargue el entorno
4. Abre `index.html` con la extensión Live Server

### Opción 2: Ejecución Local
1. Clona el repositorio:
   ```bash
   git clone https://github.com/samumafu/TicTacToe.git
   cd TicTacToe
   ```
2. Abre `index.html` en tu navegador
3. ¡A jugar!

---

## 🎮 Reglas del Juego

1. **Dos jugadores:** X y O alternan turnos
2. **Objetivo:** Conseguir 3 símbolos en línea (horizontal, vertical o diagonal)
3. **Empate:** Si se llena el tablero sin ganador
4. **Controles:**
   - Haz clic en cualquier celda vacía para jugar
   - **"Nueva partida"** → Reinicia solo el tablero
   - **"Reiniciar marcador"** → Borra toda la puntuación

---

## 💡 Características Destacadas del Código

### Algoritmo de Detección de Ganador
```javascript
const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // filas
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columnas
  [0, 4, 8], [2, 4, 6]              // diagonales
];
```

### Validación de Movimientos
- Solo permite marcar celdas vacías
- Previene clicks durante el estado de pausa
- Alternancia automática de turnos

### Interfaz Reactiva
- Actualización en tiempo real del marcador
- Indicador visual del jugador activo (tarjeta resaltada)
- Feedback inmediato en cada acción

---

## 🎓 Aprendizajes y Experiencias

### Con GitHub Codespaces
✅ **Ventajas:**
- Acceso a un entorno completo sin instalación local
- Integración perfecta con GitHub
- Todas las herramientas preinstaladas
- Fácil sincronización de cambios
- Ideal para colaboración en equipo

✅ **Cómo mejoró el desarrollo:**
- Desarrollo 100% basado en la nube
- Sin conflictos de configuración local
- Posibilidad de compartir el entorno fácilmente
- Versionado automático con Git

---

## 📊 Captura de Pantalla / Demo

| Elemento | Descripción |
|----------|-------------|
| **Marcador** | Muestra los puntos de X y O en toda la sesión |
| **Tablero 3x3** | Grid interactivo con detección de clics |
| **Barra de Estado** | Indica turno actual o resultado final |
| **Botones** | Control de juego y marcador |

---

## 🔮 Posibles Mejoras Futuras

- [ ] Modo de un solo jugador (IA)
- [ ] Niveles de dificultad
- [ ] Historial de partidas guardadas
- [ ] Animaciones más complejas
- [ ] Soporte multijugador en tiempo real
- [ ] Temas de color personalizables
- [ ] PWA (Progressive Web App) para instalar

---

## 👥 Información del Equipo

| Rol | Responsable |
|-----|------------|
| Desarrollo | GitHub Copilot + Equipo |
| Diseño | CSS3 Moderno |
| Testing | Validación manual |

---

## 📝 Notas Técnicas

- **Compatibilidad:** Chrome, Firefox, Safari, Edge (navegadores modernos)
- **Tamaño:** Archivo mínimo, sin dependencias externas
- **Performance:** Tiempo de carga < 1 segundo
- **Accesibilidad:** Interfaz clara y comprensible

---

## 🔗 Enlaces

- **Repositorio:** https://github.com/samumafu/TicTacToe
- **Desarrollado con:** GitHub Codespaces + VS Code
- **Plataforma elegida:** GitHub Codespaces (ideal para proyectos con GitHub)

---

## 📜 Licencia

Este proyecto es de código abierto. Siéntete libre de usar, modificar y distribuir.

---

**¡Espero que disfrutes el juego! 🎉**
