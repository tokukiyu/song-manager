// src/components/SongList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSong, deleteSong } from '../songsSlice';
import { Box, Flex } from 'rebass/styled-components';
import styled from '@emotion/styled';
import { space, color, layout } from 'styled-system';

const SongListContainer = styled(Box)`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  ${space}
  ${color}
  ${layout}
`;

const SongItem = styled(Flex)`
  list-style-type: none;
  margin-bottom: 15px;
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  button {
    ${space}
    ${color}
    ${layout}
    // Additional Tailwind CSS classes
    bg-blue-500
    text-white
    rounded
    transition
    duration-300
    hover:bg-blue-700
  }

  ${space}
  ${color}
  ${layout}
`;

const Loader = styled(Box)`
  font-size: 18px;
  font-weight: bold;

  ${space}
  ${color}
  ${layout}
`;

const Error = styled(Box)`
  color: red;

  ${space}
  ${color}
  ${layout}
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
          <SongItem
            key={song.id}
            alignItems="center"
            justifyContent="space-between"
            p={3} // Use Tailwind CSS spacing utilities
          >
            <div>
              <strong>{song.title}</strong> by {song.artist}
            </div>
            <div>
              <button
                onClick={() => handleUpdateSong(song.id, 'Updated Song', 'Updated Artist')}
              >
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
