import { Tooltip } from "@mui/material";



const WhatsAppButton = () => {
  const phoneNumber = "3174299424"; 
  const message = "Hola, tengo una consulta.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      aria-label="Habla con nosotros"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 bg-white rounded-lg bottom-5 right-5"
    >
      <Tooltip title="Whatsapp">
        <img className="icon-[uim--whatsapp] text-5xl bg-emerald-500" role="img" aria-hidden="true" />
      </Tooltip>
    </a>
  );
};

export default WhatsAppButton;
