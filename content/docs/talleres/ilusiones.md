# Ilusiones

## Ilusiones Opticas

Rectangulos en rotación

{{<p5-iframe ver="1.4.2" sketch="/sketches/rotating_rectangles.js" >}}

Rejilla Trapezoidal

{{<p5-iframe ver="1.4.2" sketch="/sketches/trapezoidal_grid.js" >}}

## **Ver color en una imagen a blanco y negro**

Nosotros tenemos tres tipos de conos en nuestros ojos, sensibles a las ondas de luz asociadas a los colores verde, rojo y azul. Cuando nos exponemos a una gran cantidad de luz de un determinado color, estos conos se fatigan y dejan de responder temporalmente. Cuando volvemos a ver la imagen en blanco y negro, solo actúan los conos que no están fatigados, por lo que vemos los colores complementarios a los "fatigados" durante unos segundos.

{{< details "Shortcuts" >}}
| Tecla | Description |
| -------- | ----------- |
| R | Reiniciar el Timer |
| O | Mostrar Imagen Original |
|   | Sube cualquier imagen |
{{< /details >}}

{{<p5-iframe ver="1.4.2" sketch="/sketches/negative_illusion.js" >}}

**Referencias**

https://verne.elpais.com/verne/2015/11/20/articulo/1448008967_394846.html


## Kernels de imagenes

{{< details "Shortcuts" >}}
| Tecla | Description |
| -------- | ----------- |
| F | Cambiar mascara |
| G | Mostrar histograma |
| H | Cambiar imagen |
| V | Disminuir brillo |
| B | Aumentar brillo |
| R | Resetear imagen |
{{< /details >}}

{{<p5-iframe ver="1.4.2" sketch="/sketches/convolutions.js" >}}

# **Ejercicios**

{{< hint info >}}
**Exercise**

Let `rgb1` and `rgb2` be two `rgb` colors. What `rgb1 * rgb2` would mean?
{{< /hint >}}

Sabemos que los colores en formato RGB están representados por valores de 0 a 255 en cada uno de los canales (R=Red, G=Green, B=Blue), al ser valores numéricos que implicación su multiplicación.



{{<p5-iframe ver="1.4.2" sketch="/sketches/color_multiply.js" width="420" height="460">}}
