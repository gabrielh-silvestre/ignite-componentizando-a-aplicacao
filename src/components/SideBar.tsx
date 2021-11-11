import { useState, useEffect } from 'react';

import { Button } from './Button';
import { api } from '../services/api';

import { GenreResponseProps, Genres } from '../@types';

export default function SideBar(props: GenreResponseProps) {
  const { selectedGenreId, setSelectedGenreId } = props;

  const [genres, setGenres] = useState<Genres[]>([]);

  useEffect(() => {
    api.get<Genres[]>('genres').then((response) => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
