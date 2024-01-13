// Contacto.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Importa la hoja de estilo de Leaflet
import styles from './Contacto.module.css';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';
import logoMap from '../../imagenes/logo.png'
import L from 'leaflet';
import { useState } from 'react';
import emailjs from 'emailjs-com';

const Contacto = () => {

    const [ref, inView] = useInView() 

      // Configuración de la animación principal
    const mainAnimation = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
        config: { tension: 170, friction: 20 },
    });

    const customIcon = new L.Icon({
        iconUrl: "https://icones.pro/wp-content/uploads/2021/02/icone-de-broche-de-localisation-rouge.png",
        iconSize: [50, 50], // ajusta el tamaño según tus necesidades
        iconAnchor: [25, 50], // ajusta la posición del icono según tus necesidades
      });

    const position = [-34.55650338614781, -58.445041305230696];

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Configuración de Email.js
      const serviceId = 'service_hzsmy39';
      const templateId = 'template_xr5aza2';
      const userId = 'JvGtV5AT4cQgjyV0b';
  
      // Datos del formulario
      const formData = {
        nombre: e.target.nombre.value,
        email: e.target.email.value,
        mensaje: e.target.mensaje.value,
      };
  
      // Usar una dirección de correo diferente como destinatario
      const destinatario = 'riostiziano6@gmail.com';
  
      // Envío del correo electrónico
      emailjs
        .send(serviceId, templateId, { ...formData, destinatario }, userId)
        .then((response) => {
          console.log('Correo electrónico enviado con éxito:', response);
          alert('Correo electrónico enviado correctamente');
  
          // Reinicia los valores del formulario
          setNombre('');
          setEmail('');
          setMensaje('');
        })
        .catch((error) => {
          console.error('Error al enviar el correo electrónico:', error);
          alert('Error al enviar el correo electrónico');
        });
    };

    return (
        <animated.div id="contacto" className={`${styles.contactoContainer} ${styles.animated}`} style={mainAnimation} ref={ref}>
        <h1 className={styles.titleC}>¡Contactanos!</h1>
        <div className={styles.mapContainer}>
            <MapContainer center={position} zoom={15} style={{ width: '100%', height: '400px' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={customIcon} >

                <Popup>
                    <div className={styles.popupContent}>
                        <img src={logoMap} alt="Logo de ubicación" className={styles.popupLogo} />
                        <p className={styles.popupText}>Estudio De Francisco</p>
                    </div>
                </Popup>
            </Marker>
            </MapContainer>
            <p className={styles.address}>
                Dirección: Echeverría 1328, CABA, Argentina
            </p>
        </div>
        <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <label>
          Correo electrónico:
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Mensaje:
          <textarea name="mensaje" value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
        </label>
        <button type="submit">Enviar</button>
      </form>

            </div>
        </animated.div>
    );
};

export default Contacto;
