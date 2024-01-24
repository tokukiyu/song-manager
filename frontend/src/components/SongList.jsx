// src/components/SongList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSong, deleteSong } from '../songsSlice';
import tw, { styled } from 'twin.macro';

const SongListContainer = styled.div`
  ${tw`max-w-2xl mx-auto p-4 border rounded shadow-md`}
`;

const SongItem = styled.li`
  ${tw`list-none mb-4 p-4 bg-white border rounded`}
  
  button {
    ${tw`ml-4 px-4 py-2 bg-blue-500 text-white rounded transition duration-300 hover:bg-blue-700`}
  }
`;

const Loader = styled.div`
  ${tw`text-2xl font-bold`}
`;

const Error = styled.div`
  ${tw`text-red-500`}
`;

function SongList() {
  const { songs, loading, error } = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'songs/fetchSongs' });
  }, [dispatch]);

  const handleUpdateSong = (id, title, artist) => {
    dispatch(updateSong({ id, title, artist }));
  };

  const handleDeleteSong = (id) => {
    dispatch(deleteSong(id));
  };

  return (
    <SongListContainer>
      {loading && <Loader>Loading...</Loader>}
      {error && <Error>Error: {error}</Error>}
      <ul>
        {songs.map((song) => (
          <SongItem key={song.id}>
            <div>
              <strong>{song.title}</strong> by {song.artist}
            </div>
            <div>
              <button onClick={() => handleUpdateSong(song.id, 'Updated Song', 'Updated Artist')}>
                Update
              </button>
              <button onClick={() => handleDeleteSong(song.id)}>Delete</button>
            </div>
          </SongItem>
        ))}
      </ul>
    </SongListContainer>
  );
}

export default SongList;
