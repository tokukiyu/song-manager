// src/components/SongList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSong, deleteSong } from '../songsSlice';
import { Box, Flex } from 'rebass/styled-components';
import styled from '@emotion/styled';
import { space, color, layout } from 'styled-system';

const SongListContainer = styled(Box)`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  ${space}
  ${color}
  ${layout}
`;

const SongItem = styled(Flex)`
  list-style-type: none;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 18px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  button {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #2c3e50;
    }

    ${space}
    ${color}
    ${layout}
  }

  ${space}
  ${color}
  ${layout}
`;

const Loader = styled(Box)`
  font-size: 20px;
  font-weight: bold;
  color: #3498db;

  ${space}
  ${color}
  ${layout}
`;

const Error = styled(Box)`
  color: #e74c3c;
  font-size: 18px;
  font-weight: bold;

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
