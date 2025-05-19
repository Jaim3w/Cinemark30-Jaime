import nodemailer from 'nodemailer';
import { config } from '../config.js'; 
const transpoerter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.emailUser.user_email,
    pass: config.emailUser.user_pass
  }
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transpoerter.sendMail({
      from: '"Cinemark" <jaimeperla26@gmail.com>',
      to,
      subject,
      text,
      html,
    });
    console.log("Email enviado: " + info.response);
    return info;
  } catch (error) {
    console.error("Error al enviar el email: ", error);
    throw error;
  }
};

// ✅ Esta función está FUERA de sendEmail
const HTMLRecoveryEmail = (code) => {
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #ffffff; max-width: 600px; margin: 0 auto; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; color: #333;">
    <div style="background: linear-gradient(90deg, #e74c3c, #c0392b); padding: 20px; border-radius: 10px 10px 0 0;">
      <h1 style="color: #fff; margin: 0; font-size: 26px;">🎬 Recuperación de Contraseña - Cinemark</h1>
    </div>

    <div style="padding: 25px 20px;">
      <p style="font-size: 16px; line-height: 1.6;">
        ¡Hola, estimado cliente!<br><br>
        Hemos recibido una solicitud para restablecer tu contraseña.<br>
        Utiliza el siguiente código para continuar con el proceso:
      </p>

      <div style="margin: 30px auto; display: inline-block; background: #e67e22; color: #fff; padding: 15px 30px; font-size: 22px; font-weight: bold; border-radius: 8px; box-shadow: 0 4px 8px rgba(243, 156, 18, 0.4);">
        ${code}
      </div>

      <p style="font-size: 14px; color: #777; margin-top: 30px;">
        Este código será válido durante los próximos <strong>15 minutos</strong>.<br>
        Si no solicitaste este correo, puedes ignorarlo con seguridad.
      </p>
    </div>

    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">

    <footer style="font-size: 13px; color: #aaa;">
      ¿Necesitas ayuda? Contáctanos en 
      <a href="mailto:soporte@cinemark.com" style="color: #e74c3c; text-decoration: none;">soporte@cinemark.com</a><br>
      ¡Gracias por confiar en <strong>Cinemark</strong>!
    </footer>
  </div>
  `;
};

// ✅ Exporta correctamente
export { sendEmail, HTMLRecoveryEmail };