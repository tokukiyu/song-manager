// src/components/SongList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSong, deleteSong } from '../songsSlice';
import { Box, Flex } from 'rebass/styled-components';
import styled from '@emotion/styled';
import { space, color, layout } from 'styled-system';


const SongListContainer = styled(Box)`
  // Existing styles
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  // Tailwind CSS classes
  ${space}
  ${color}
  ${layout}
`;

const SongItem = styled(Flex)`
  // Tailwind CSS classes
  list-style-type: none;
  margin-bottom: 15px;
  padding: 15px;
  bg-red-700 border border-gray-300 rounded-md text-base;

  // Tailwind utility classes for Flex component
  ${space}
  ${color}
  ${layout}

  &:hover {
    // Tailwind CSS hover classes
    bg-gray-200 border-gray-400;
  }
`;


const Loader = styled(Box)`
  // Existing styles
  font-size: 18px;
  font-weight: bold;

  // Tailwind CSS classes
  ${space}
  ${color}
  ${layout}
`;

const Error = styled(Box)`
  // Existing styles
  color: red;

  // Tailwind CSS classes
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
            p={3}
          >
            <div className=''>
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
