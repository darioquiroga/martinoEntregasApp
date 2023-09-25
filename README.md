# appCerealnet-ionic7
Versión actualizada a las nuevas versiones de android 12 o 13 y node 16.14

Node: 16.14.0

. Instala Ionic y Capacitor en tu computadora.
2. Crea un nuevo proyecto de Ionic con el comando "ionic start nombre-del-proyecto (sidemenu, blank, etc)".
3. Agrega Capacitor al proyecto con el comando "npm install --save @capacitor/core @capacitor/cli".
4. Inicializa Capacitor con el comando "npx cap init".
5. Agrega las plataformas que desees soportar con el comando "npx cap add nombre-de-la-plataforma".
6. Construye tu aplicación con el comando "ionic build".
7. Copia los archivos de construcción a la plataforma deseada con el comando "npm install @capacitor/android" y despues  "npx cap copy nombre-de-la-plataforma".
8. Abre tu IDE preferido y comienza a desarrollar tu aplicación en Ionic 7 con Capacitor.
9. tuve que instalar manualmente ionic/cli 7 porque mi version global de ionic era la 5.2 y al tuve que actualizar manualmente con este comando:
"npm install rxjs@7.5.0", "npm install @ionic/angular-server@7" , "npm install -g @ionic/cli@7"

