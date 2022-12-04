# 

<img src='/assets/image/portal2.png' class="center" />

## El juego

Portal es una serie de videojuegos de plataforma de rompecabezas en primera persona desarrollados por Valve. Ambientados en el universo de Half-Life, los dos juegos principales de la serie, Portal (2007) y Portal 2 (2011), se centran en una mujer, Chell, obligada a someterse a una serie de pruebas en el Centro de Enriquecimiento Aperture Science por parte de una maliciosa inteligencia artificial, GLaDOS(Genetic Lifeform and Disk Operating System), que controla las instalaciones. La mayoría de las pruebas implican el uso del "Dispositivo de portal portátil de Aperture Science", la "pistola de portal", que crea una conexión similar a un agujero de gusano del tamaño de un humano entre dos superficies planas. El personaje del jugador o los objetos en el mundo del juego pueden moverse a través de portales mientras conservan su impulso. Esto permite utilizar complejas maniobras de "lanzamiento" para cruzar espacios amplios o realizar otras hazañas para llegar a la salida de cada cámara de prueba. Existen otras mecánicas, como láseres, puentes de luz, embudos de tractor y torretas, para ayudar o dificultar el objetivo del jugador de llegar a la salida.

<img src="/assets/image/halflife.png" class="center" width="200" height="200">

Los juegos de Portal se destacan por llevar a los estudiantes y sus proyectos del Instituto de Tecnología DigiPen a Valve y extender sus ideas a los juegos completos. El concepto de portal fue introducido por el juego Narbacular Drop y condujo a la base del primer juego. Otro juego, Tag: The Power of Paint , formó la base de los "geles" que alteran la superficie introducidos en Portal 2 .


**Referencias** </br>
https://en.wikipedia.org/wiki/Portal_(series) </br>
https://youtu.be/_9EqDFJF7MI?t=123


## Conceptos y dinámicas

<img src='/assets/image/portal1.png'  class="center" />

### Portales

El sistema de juego se centra en el Aperture Science Handheld Portal Device (ASHPD), un dispositivo manual que crea portales en superficies planas, permitiendo viajes instantáneos y una conexión visual y física entre 2 puntos cualquiera del espacio tridimensional. Si dos portales ligados están en diversos planos, pueden ocurrir efectos extraños en la geometría y gravedad. Por ejemplo: el jugador puede caminar a través de un portal en la pared y "caer" desde el techo varios metros detrás de donde comenzó. Solo se pueden mantener abiertos 2 portales al mismo tiempo. Si un nuevo portal es creado, reemplazará al portal del mismo color previamente abierto.

<img src='/assets/gif/Portales.gif'  /> 


### Pistola de portales

Para avanzar en el juego, el jugador debe aprender a usar a su favor los particulares efectos de tener dos portales uniendo zonas donde la gravedad funciona de forma distinta. Por la manera en que funcionan los portales, estos conservan la inercia de los objetos que los atraviesan, pero cambian la dirección de su trayectoria de acuerdo a la superficie en la que están colocados. De esta forma, un movimiento de caída libre puede ser transformado en un lanzamiento parabólico u horizontal, o cualquier otra combinación. Gracias a esto, los desafíos suelen requerir imaginativas maniobras para cruzar largas distancias transformando una caída en un lanzamiento parabólico y alcanzar alturas imposibles transformando caídas en lanzamientos verticales.

<iframe src="https://giphy.com/embed/jEfUgL3Yv3f6ohxvtc" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/game-portal-p5js-jEfUgL3Yv3f6ohxvtc">via GIPHY</a></p>

### Ímpetu

El ímpetu, producto de la masa por la velocidad de un cuerpo, se conserva entre portales. Para los legos: si entras rápido, sales rápido.
— GLaDOS

<img src='/assets/image/fisica1.png'  /> 
<img src='/assets/image/fisica2.png'  />


<iframe src="https://giphy.com/embed/bkyerKz92KALrazYe2" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/game-portal-p5js-bkyerKz92KALrazYe2">via GIPHY</a></p>

### Otros

### Cubos y Botones

<iframe src="https://giphy.com/embed/Ilv7LSD6rgZUFl6nex" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/game-portal-p5js-Ilv7LSD6rgZUFl6nex">via GIPHY</a></p>

### Destrucción de materia

<iframe src="https://giphy.com/embed/Ka8jwTfO1Sob5Vz74t" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/game-portal-p5js-Ka8jwTfO1Sob5Vz74t">via GIPHY</a></p>

**Referencias** </br>
http://youtube.com/watch?v=wCvpoYtlbCs </br>
https://es.wikipedia.org/wiki/Portal_(videojuego) </br>
https://theportalwiki.com/wiki/Portals/es


## Primer acercamiento

### Telestrasportación y portales en 2D

{{<p5-iframe ver="1.4.2" sketch="/sketches/portal2d.js" width="430" height="430" >}}


**Referencias** </br>
https://editor.p5js.org/simontiger/sketches/GTnCTBHb3 </br>


### Cámaras

Cámara y funcionamiento básico

<img src='/assets/image/camara1.png'  />

Alineación de las cámaras

<iframe src="https://giphy.com/embed/OzV1vCGIP9nTq570nk" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/game-portal-p5js-OzV1vCGIP9nTq570nk">via GIPHY</a></p>

Desplazamiento de la cámara

<iframe src="https://giphy.com/embed/rtWCguPf97WXmY3mAM" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/game-portal-p5js-rtWCguPf97WXmY3mAM">via GIPHY</a></p>

Ajuste de frustum según posición del jugador

<iframe src="https://giphy.com/embed/IIhCXSeOQMCdQmZ3Ky" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/game-portal-p5js-IIhCXSeOQMCdQmZ3Ky">via GIPHY</a></p>

Prácticas con cámaras

<img src='/assets/gif/Camara2.gif'  />

## Segundo acercamiento

### Mejora del concepto

<img src='/assets/image/portalProfe.png' />

### Dinámica y movimiento

<iframe src="https://giphy.com/embed/JaqM3hkyorkyzlIugV" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/game-portal-p5js-JaqM3hkyorkyzlIugV">via GIPHY</a></p>

**Referencias** </br>
(Gráfico tomado de asesoría con el profesor Jean Pierre Charalambos) </br>
https://www.youtube.com/watch?v=HerCR8bw_GE&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA </br>
https://www.youtube.com/watch?v=NGeZCAi2bJs&t=33s </br>
https://www.youtube.com/watch?v=dkfw9UaWeQc </br>
https://www.iste.org/es/explore/In-the-classroom/ Teach-physics-with-the-popular-video-game-Portal


## Sketch

{{< p5-iframe sketch="/sketches/portal_V1.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="625" height="925" >}}