import { useState } from "react";

const CalificarEspecialistaPopup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const stars = [1, 2, 3, 4, 5];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes procesar el comentario y el ranking, por ejemplo, enviarlos a una API.
    console.log("Rating:", rating, "Comentario:", comment);
    // Reinicia los estados y cierra el modal.
    setRating(0);
    setComment("");
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Botón para abrir el popup */}
      <div className="my-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-azul-colono text-white h-10 rounded-xl p-2 hover:bg-blue-600"
        >
          Calificar especialista
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Fondo semi-transparente */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsModalOpen(false)}
          ></div>
          {/* Contenido del modal */}
          <div className="bg-white rounded-xl p-6 z-50 w-11/12 md:w-1/3 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Calificar Especialista
            </h3>
            <form onSubmit={handleSubmit}>
              {/* Sección de estrellas */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Selecciona una calificación:
                </label>
                <div className="flex space-x-2">
                  {stars.map((star) => (
                    <svg
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`w-8 h-8 cursor-pointer ${
                        star <= (hoverRating || rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                    </svg>
                  ))}
                </div>
              </div>
              {/* Sección de comentario */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Comentario:
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Escribe tu comentario aquí..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>
              {/* Botones de acción */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-azul-colono text-white hover:bg-blue-600"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CalificarEspecialistaPopup;
