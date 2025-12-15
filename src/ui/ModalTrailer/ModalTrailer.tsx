import React from 'react';
import Modal from '@/ui/Modal';
import { ModalTrailerProps } from '@/ui/ModalTrailer/ModalTrailer.type';
import { getYoutubeEmbedUrl } from '@/utils/youtube';

//Стили
import './ModalTrailer.scss';

const ModalTrailer: React.FC<ModalTrailerProps> = ({
  movie,
  onClose,
  isOpen,
}) => {
  const baseSrc = movie
    ? getYoutubeEmbedUrl(movie.trailerYoutubeId, movie.trailerUrl)
    : null;

  const trailerSrc = baseSrc ? `${baseSrc}?autoplay=1` : null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="trailer"
      modalClassName="modal-trailer"
    >
      {trailerSrc ? (
        <div className="modal-trailer__video-wrapper">
          <iframe
            className="modal-trailer__video"
            src={trailerSrc}
            title={movie.title || 'Трейлер'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <p className="modal-trailer__empty">
          Трейлер недоступен для этого фильма
        </p>
      )}
    </Modal>
  );
};

export default ModalTrailer;
