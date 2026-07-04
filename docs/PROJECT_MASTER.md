Me parece una excelente idea. De hecho, creo que este documento debería convertirse en el **documento maestro del proyecto**. La idea es que dentro de uno, dos o cinco años puedas abrir una conversación nueva con cualquier LLM (ChatGPT, Claude, Gemini, etc.), pegar este documento y el modelo pueda continuar el proyecto exactamente donde quedó, sin perder contexto.

Además, voy a incorporar las lecciones aprendidas durante esta conversación (por ejemplo, dejar de hacerte crear archivos manualmente, automatizar todo, ir directamente al código, etc.).

---

# GAME PLATFORM FRAMEWORK

## Documento Maestro del Proyecto

### Versión 1.0

---

# 1. Objetivo del documento

Este documento es el contexto permanente del proyecto.

Debe permitir que cualquier LLM pueda continuar el desarrollo exactamente desde el punto donde quedó.

No debe reinventar la arquitectura.

No debe cambiar el estilo del proyecto.

Debe continuar respetando todos los criterios definidos.

---

# 2. Objetivo del proyecto

Construir un framework profesional para desarrollar plataformas de juegos HTML5.

El framework debe permitir crear nuevos juegos con el mínimo código posible.

Idealmente agregar un juego debería ser tan simple como

```
gpf create solitaire

gpf create sudoku

gpf create minesweeper
```

y el framework debe generar automáticamente toda la estructura.

---

# 3. Objetivo REAL

No construir solamente una web de juegos.

Construir un FRAMEWORK reutilizable.

Luego construir la web utilizando ese framework.

Es decir:

```
Framework
        ↓
Website
        ↓
Juegos
```

No al revés.

---

# 4. Filosofía

Todo debe ser reutilizable.

Todo debe ser desacoplado.

Todo debe poder extenderse mediante plugins.

Todo debe ser automatizable.

Todo debe poder generarse automáticamente.

Todo debe poder eliminarse sin romper el resto.

---

# 5. Principio más importante

El desarrollador NO debe escribir archivos repetitivos.

El framework debe escribirlos.

Cada vez que sea posible debe agregarse automatización.

---

# 6. Criterio de trabajo

El LLM NO debe explicar demasiado.

Debe producir.

Debe escribir código.

Debe avanzar.

Las explicaciones deben ser mínimas.

La prioridad es entregar código funcional.

---

# 7. Cómo debe responder el LLM

Nunca responder:

> Cree un archivo.

Debe responder:

```
Ejecute

mkdir ...

```

o directamente

```
cat > archivo << EOF

...

EOF
```

O mejor todavía

```
install-step-15.sh
```

que genere todo automáticamente.

---

# 8. Automatización

Mientras más automatización exista mejor.

Siempre preferir

```
1 comando
```

antes que

```
20 archivos manuales
```

Siempre.

---

# 9. Criterio arquitectónico

Todo es un plugin.

No solamente:

* Ads
* SEO

También

* Juegos
* Audio
* Rankings
* Traducciones
* Temas
* Estadísticas

Todo.

---

# 10. Comunicación

Los plugins nunca deben conocerse entre sí.

Toda comunicación debe hacerse mediante

```
EventBus
```

---

# 11. Stack tecnológico

Actualmente elegido

```
NodeJS

JavaScript moderno

HTML

CSS

Git

GitHub

GitHub Pages
```

No incorporar tecnologías innecesarias.

No incorporar React.

No incorporar Next.

No incorporar Vite.

No incorporar Astro.

El objetivo es máximo rendimiento y mínimo peso.

---

# 12. Objetivo de rendimiento

Lighthouse cercano a

```
100
```

en

Performance

SEO

Accessibility

Best Practices

---

# 13. Objetivo de monetización

Principalmente

Google Adsense.

Posteriormente

Ezoic

Mediavine

Raptive

según crecimiento.

---

# 14. Idiomas

Desde el inicio.

No agregarlos después.

Toda cadena visible debe ser traducible.

---

# 15. Responsive

Desktop

Tablet

Mobile

UltraWide

TV

---

# 16. Accesibilidad

WCAG

ARIA

Keyboard Navigation

Screen Readers

Dark Mode

---

# 17. SEO

Debe estar incorporado desde el inicio.

No al final.

---

# 18. PWA

Debe estar prevista desde el inicio.

---

# 19. Publicidad

Debe ser un plugin.

No debe mezclarse con el código del juego.

---

# 20. Analytics

Debe ser un plugin.

---

# 21. Juegos

Cada juego será un plugin.

No existirá código específico dentro del framework.

---

# 22. Estado actual del proyecto

Actualmente existe:

```
CLI

Project Generator

Plugin System

Plugin Manager

Event Bus

Framework Base
```

---

# 23. Estructura del código implementado

```
src/
├── cli/
│   ├── index.js (CLI entry point)
│   ├── CommandRegistry.js (Sistema de comandos)
│   └── commands/
│       └── NewCommand.js (Generador de nuevos proyectos)
├── core/
│   ├── Framework.js (Motor del framework)
│   └── createProject.js (Utilidades de creación)
├── events/
│   └── EventBus.js (Sistema de eventos)
├── plugins/
│   ├── Plugin.js (Clase base de plugins)
│   ├── PluginManager.js (Gestor de plugins)
│   └── core/
│       ├── LoggerPlugin.js
│       └── StatisticsPlugin.js
└── template/
    └── TemplateEngine.js (Motor de templates)
```

---

# 24. Lo que YA está implementado

## Framework Base

✅ **Framework.js**
- Constructor inicializa EventBus y PluginManager
- Método `boot()` instancia, inicia y emite evento de inicio
- Flujo: install → start → framework.started

✅ **EventBus**
- Sistema pub/sub funcional
- Método `on()` para suscribirse a eventos
- Método `emit()` para disparar eventos
- Manejo de listeners con Map

✅ **Plugin (Clase base)**
- Ciclo de vida: install → start → stop
- Método `getName()` para identificación
- Sistema de configuración mediante constructor

✅ **PluginManager**
- Registro de plugins
- Ejecución en orden de ciclo de vida
- Comunicación con framework central

## CLI

✅ **CommandRegistry**
- Sistema de registro de comandos
- Ejecución dinámica

✅ **CLI (index.js)**
- Punto de entrada: `npm run gpf`
- Soporte para subcomandos
- Mensaje de ayuda

✅ **NewCommand**
- Genera estructura inicial de proyecto
- Integración con framework

## Plugins de ejemplo

✅ **LoggerPlugin**
- Registro de eventos
- Debugging

✅ **StatisticsPlugin**
- Recolección de estadísticas
- Modelo de plugin completo

---

# 25. Lo que falta por fase

## Fase 2: Asset Management

⬜ Asset Manager
- Registrar y acceder a recursos
- Validación de tipos

⬜ Asset Loader
- Carga de imágenes
- Carga de audio
- Carga de JSON
- Carga de sprites

⬜ Asset Cache
- Almacenamiento en memoria
- Gestión de limpieza

## Fase 3: Input Management

⬜ Input Manager (base)

⬜ Mouse Handler
- Posición
- Click
- Double click
- Drag

⬜ Keyboard Handler
- Key down
- Key up
- Combos

⬜ Touch Handler
- Tap
- Swipe
- Pinch
- Long press

⬜ Gamepad Handler
- Button detection
- Analog sticks
- Vibration

## Fase 4: Scene & UI

⬜ Scene Manager
- Scene stack
- Transitions
- State management

⬜ UI Manager
- Component system
- Layout engine
- Theme application

⬜ Theme Manager
- Color schemes
- Dark/Light mode
- Custom themes

## Fase 5: Rendering

⬜ Renderer (abstracción)

⬜ Canvas Renderer
- 2D context
- Drawing primitives
- Sprite rendering

⬜ Responsive Renderer
- Canvas scaling
- DPI handling
- Viewport management

⬜ SVG Renderer (opcional)

## Fase 6: Game Engine

⬜ Animation Manager
- Frame-based animation
- Tweening
- Easing functions

⬜ Particle Manager

⬜ Physics (básica)
- Collision detection
- Simple gravity

## Fase 7: Storage & State

⬜ Storage Manager
- LocalStorage wrapper
- IndexedDB support
- Encryption

⬜ Save Manager
- Serialización de estado
- Slots de guardado
- Auto-save

⬜ Configuration Manager
- Configuración global
- User preferences

## Fase 8: Audio

⬜ Sound Manager
- Efectos de sonido
- Pool de instancias
- Volume control

⬜ Music Manager
- Reproducción de música
- Crossfade
- Playlist

## Fase 9: Accesibilidad & Localización

⬜ Localization Manager
- Carga de idiomas
- Plurales
- Interpolación

⬜ Accessibility Manager
- Screen reader support
- Keyboard navigation
- High contrast mode
- Text scaling

## Fase 10: Analytics & Monetización

⬜ Analytics Manager
- Event tracking
- Session tracking

⬜ Ads Manager
- Banner ads
- Interstitial ads
- Rewarded video

⬜ SEO Manager
- Meta tags
- Structured data
- Sitemap generation

## Fase 11: Social & Multiplayer

⬜ Leaderboard Manager
- Local leaderboards
- Cloud leaderboards

⬜ Achievements Manager
- Achievement tracking
- Notifications
- Badges

⬜ Statistics Manager (avanzado)
- Análisis profundo
- Reportes

## Fase 12: Infrastructure

⬜ Network Manager
- API communication
- Retry logic
- Caching

⬜ Update Manager
- Version checking
- Asset updates

⬜ Developer Tools
- Debug panel
- Performance monitoring
- Memory profiler

⬜ Testing Framework
- Unit testing
- Integration testing
- E2E testing

## Fase 13: Deployment

⬜ Documentation Generator
- API docs
- Tutorials

⬜ Plugin Marketplace
- Registry
- Installation system

⬜ Deployment Manager
- Build system
- Publishing
- CDN integration

---

# 26. Metodología de desarrollo

Cada respuesta del LLM debe entregar UNA FASE completa.

No media fase.

No teoría.

No documentos largos.

Debe terminar con un framework funcionando.

---

# 27. Formato de entrega

Cada fase debe generar automáticamente todos los archivos.

Nunca pedir al usuario crear 15 archivos manualmente.

Siempre preferir:

```
install-step-XX.sh
```

o

```
npm run gpf install XX
```

---

# 28. Qué debe hacer el LLM antes de escribir código

Verificar:

¿Existe una forma de automatizar aún más?

Si la respuesta es sí,

automatizar.

---

# 29. Qué NO debe hacer

No filosofar.

No justificar durante páginas.

No escribir documentos enormes.

No repetir conceptos.

No explicar programación básica.

No hacer perder tiempo.

---

# 30. Objetivo final

Poder ejecutar

```
gpf create solitaire
```

y obtener automáticamente

```
Juego

SEO

Assets

Responsive

Dark Theme

Analytics

Ads

Leaderboard

Achievements

Translations

PWA

Manifest

Robots

Sitemap

Tests

Documentación

Deployment
```

sin escribir una línea.

---

# 31. Estado de Fase 2 - Asset Management ✅

## Completado exitosamente

1. **AssetCache** (src/core/AssetCache.js)
   - Implementación de cache con estrategia LRU
   - Estimación automática de tamaño
   - Límite de memoria configurable (50MB por defecto)
   - Métodos: set(), get(), has(), delete(), clear()
   - Estadísticas de uso disponibles

2. **AssetLoader** (src/core/AssetLoader.js)
   - Carga síncrona y asíncrona de assets
   - Soporte para: PNG, JPG, WebP, GIF, MP3, WAV, OGG, JSON
   - Validación de tipos automática
   - Integración con AssetCache
   - Error handling robusto

3. **AssetManager** (src/core/AssetManager.js)
   - Registro centralizado de assets
   - Métodos: register(), preload(), preloadAll(), get(), getAsync(), unload()
   - Prevención de carga duplicada
   - Lista de assets registrados
   - Estadísticas de carga

4. **AssetManagerPlugin** (src/plugins/core/AssetManagerPlugin.js)
   - Integración completa con Framework
   - Ciclo de vida: install → start → stop
   - EventBus para asset.loaded y asset.failed
   - Cache size configurable

5. **Comandos CLI**
   - `npm run gpf -- install:assets` - Instala estructura y assets de ejemplo
   - `npm run gpf -- validate:assets [path]` - Valida manifest.json y archivos

---

# 32. Estado de Fase 3 - Input Management ✅

## Completado exitosamente

1. **InputManager** (src/core/InputManager.js)
   - Gestor central de entrada
   - Registro y control de handlers
   - Tracking de teclas presionadas
   - Control de posición del mouse
   - Métodos: registerHandler(), enableHandler(), disableHandler(), initialize(), destroy()
   - Métodos de consulta: isKeyPressed(), getMousePosition(), isHandlerEnabled()

2. **MouseHandler** (src/core/input/MouseHandler.js)
   - Manejo completo de eventos de mouse
   - Eventos: mousemove, mousedown, mouseup, click, dblclick
   - Detección de drag automática
   - Evento drag.start y drag.end

3. **KeyboardHandler** (src/core/input/KeyboardHandler.js)
   - Manejo de teclado
   - Eventos: keydown, keyup
   - Tracking de teclas presionadas
   - Soporte para key codes y códigos de tecla

4. **TouchHandler** (src/core/input/TouchHandler.js)
   - Manejo táctil con multi-touch
   - Detecta: tap, swipe (4 direcciones), multi-touch
   - Parámetros configurables: tapThreshold, swipeMinDistance
   - Tracking de dedos activos

5. **InputManagerPlugin** (src/plugins/core/InputManagerPlugin.js)
   - Integración completa con Framework
   - Ciclo de vida: install → start → stop
   - EventBus para todos los eventos de input
   - Element configurable (browser/Node.js compatible)

6. **Comando CLI**
   - `npm run gpf -- test:input` - Testea InputManager completo

---

# 33. Próximos pasos - Inicio Fase 4

## Tarea inmediata: Scene & UI System

Implementar primero:

1. **SceneManager** - Gestor de escenas
   - Stack de escenas (push, pop)
   - Transiciones entre escenas
   - Ciclo de vida: init, enter, update, exit
   - Eventos: scene.enter, scene.exit, scene.changed

2. **Scene** - Clase base para escenas
   - Métodos: init(), enter(), update(), exit()
   - Gestión de game objects en la escena
   - Métodos helper: add(), remove(), find()

3. **UIManager** - Gestor de componentes UI
   - Registro de componentes
   - Sistema de posicionamiento
   - Z-index (profundidad)
   - Métodos: register(), create(), destroy()

4. **UIComponent** - Clase base para elementos UI
   - Propiedades: x, y, width, height, visible
   - Métodos: render(), update(), onClick()
   - Soporte para eventos click/hover

5. **ThemeManager** - Gestor de temas
   - Color schemes (light, dark, custom)
   - Aplicación de temas globales
   - CSS variables
   - Métodos: setTheme(), getTheme()

6. **SceneManagerPlugin** - Integración con plugin system
   - Gestión automática de ciclos de vida
   - EventBus para scene events

## Archivos a crear

```
src/core/
├── SceneManager.js
├── Scene.js
├── UIManager.js
├── ui/
│   ├── UIComponent.js
│   └── ThemeManager.js

src/plugins/
└── core/
    └── SceneManagerPlugin.js
```

---

## Fase 1: Framework Base

✅ CLI - CommandRegistry y comando 'new'
✅ Project Generator - NewCommand funcional
✅ Plugin System - Clase base y manager
✅ EventBus - Sistema pub/sub
✅ Template Engine - Renderizado básico
✅ Framework - Boot secuencial de plugins

---

## Fase 2: Asset Management

✅ Asset Manager - Registro y acceso centralizado
✅ Asset Loader - Carga de recursos múltiples
✅ Asset Cache - Almacenamiento inteligente con LRU eviction
✅ AssetManagerPlugin - Integración con plugin system
✅ Comandos CLI: install:assets, validate:assets

---

## Fase 3: Input Management

✅ Input Manager - Abstracción base
✅ Mouse Handler - Eventos de mouse
✅ Keyboard Handler - Eventos de teclado
✅ Touch Handler - Eventos táctiles
✅ InputManagerPlugin - Integración completa
✅ Comando CLI: test:input

---

## Fase 4: Scene & UI System (PRÓXIMA)

## Fase 5: Rendering Engine

⬜ Renderer abstraction - Interface base
⬜ Canvas Renderer - 2D rendering
⬜ Responsive Renderer - Scaling automático
⬜ SVG Renderer - Renderizado vectorial (opcional)

---

## Fase 6: Game Engine Core

⬜ Animation Manager - Animaciones y tweening
⬜ Particle System - Efectos de partículas
⬜ Physics Engine - Colisiones básicas
⬜ Game Loop - Tick system

---

## Fase 7: Storage & Configuration

⬜ Storage Manager - Persistencia de datos
⬜ Save Manager - Sistema de guardado
⬜ Configuration Manager - Gestión de config

---

## Fase 8: Audio System

⬜ Sound Manager - Efectos de sonido
⬜ Music Manager - Música de fondo
⬜ Audio Mixer - Mezcla y volumen

---

## Fase 9: Accesibilidad & Localización

⬜ Localization Manager - Multi-idioma
⬜ Accessibility Manager - WCAG compliance
⬜ Screen Reader Support

---

## Fase 10: Analytics & Monetización

⬜ Analytics Manager - Event tracking
⬜ Ads Manager - Sistema de publicidad
⬜ SEO Manager - Optimización

## Fase 11: Social Features

⬜ Leaderboard Manager - Ranking system
⬜ Achievements Manager - Logros
⬜ Statistics Manager - Análisis

## Fase 12: Infraestructura

⬜ Network Manager - APIs
⬜ Update Manager - Versionamiento
⬜ Developer Tools - Debug panel
⬜ Testing Framework - Test utilities

## Fase 13: Primer juego (Solitaire)

⬜ Reglas de Solitaire
⬜ UI del juego
⬜ Animations
⬜ Sounds

## Fase 14: Website & Deployment

⬜ Website principal
⬜ Galería de juegos
⬜ Documentación
⬜ Plugin Marketplace
⬜ Deployment pipeline

---

# 34. Control de versiones del documento

**Versión actual: 2.2**

**Última actualización: 2026-07-04**

**Cambios en v2.2:**

- ✅ Fase 3 completada (Input Management)
- ✅ Implementación de InputManager con 3 handlers
- ✅ MouseHandler: move, down, up, click, dblclick, drag
- ✅ KeyboardHandler: down, up, key state tracking
- ✅ TouchHandler: tap, swipe, multi-touch support
- ✅ InputManagerPlugin con integración EventBus
- ✅ Comando CLI: test:input
- ✅ Tests pasados exitosamente
- ✅ Roadmap actualizado: Fases 1, 2 y 3 completas
- ✅ Próximos pasos detallados para Fase 4 (Scene & UI System)

**Cambios en v2.1:**

- ✅ Fase 2 completada (Asset Management)
- ✅ Implementación de AssetManager, AssetLoader, AssetCache
- ✅ AssetManagerPlugin con integración EventBus
- ✅ Comandos CLI: install:assets, validate:assets
- ✅ Tests pasados exitosamente
- ✅ Roadmap actualizado: Fase 1 y 2 completas, Fase 3 próxima
- ✅ Próximos pasos detallados para Fase 3 (Input Management)

---

# 35. Prompts para continuar el proyecto

## Prompt general (usar al iniciar una conversación nueva)

```text
Actúa como el arquitecto principal del proyecto Game Platform Framework.

Adjunto el Documento Maestro del Proyecto.

Léelo completo antes de responder.

No rediseñes la arquitectura salvo que detectes un problema importante y puedas justificar técnicamente una mejora.

Respeta todas las decisiones ya tomadas.

Continúa exactamente desde la siguiente fase pendiente del roadmap.

No expliques teoría innecesaria.

Entrega únicamente una fase completa y funcional del framework.

Siempre automatiza al máximo el trabajo del usuario.

No pidas crear archivos manualmente. Genera scripts de instalación o comandos que creen automáticamente todos los archivos necesarios.

Antes de generar cualquier código verifica si existe una forma más eficiente de hacerlo y, si la hay, utilízala.

Al finalizar la fase indica cuál es la siguiente fase pendiente.
```

## Prompt para cada paso

```text
Continúa con la siguiente fase del roadmap.

Genera un único instalador (por ejemplo install-step-XX.sh o el mecanismo equivalente que ya exista en el framework) que cree o actualice automáticamente todos los archivos necesarios.

No entregues archivos sueltos salvo que sea estrictamente necesario.

Todo el código debe quedar listo para ejecutar inmediatamente.

Al finalizar indica únicamente el comando que debo ejecutar y espera mi confirmación antes de pasar a la siguiente fase.
```

---

## Recomendación adicional

Haría una mejora importante a este proceso: **incorporar este documento al propio repositorio** (`docs/PROJECT_MASTER.md`) y mantenerlo versionado. Así, cualquier LLM podrá trabajar con el estado real del proyecto leyendo ese único archivo, y además podremos actualizarlo automáticamente al finalizar cada fase (por ejemplo, mediante un comando `gpf docs:update`). Eso evita que el documento quede desactualizado con el tiempo y convierte la documentación en parte activa del framework.
