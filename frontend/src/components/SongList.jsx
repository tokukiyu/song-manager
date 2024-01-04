// src/components/SongList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSong, updateSong, deleteSong } from '../songsSlice';

function SongList() {
  const songsState = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  // Ensure that songs is an array before mapping
  const songs = songsState.songs || [];

  const handleAddSong = () => {
    dispatch(addSong({ id: Date.now(), title: 'New Song', artist: 'New Artist' }));
  };

  const handleUpdateSong = (id, title, artist) => {
    dispatch(updateSong({ id, title, artist }));
  };

  const handleDeleteSong = (id) => {
    dispatch(deleteSong(id));
  };

  return (
    <div>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.title} by {song.artist}{' '}
            <button onClick={() => handleUpdateSong(song.id, 'Updated Song', 'Updated Artist')}>
              Update
            </button>
            <button onClick={() => handleDeleteSong(song.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddSong}>Add Song</button>
    </div>
  );
}

export default SongList;
