// src/components/SongList.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSong, deleteSong, addSong, fetchSongs } from '../songsSlice';
import { Box, Flex } from 'rebass/styled-components';
import styled from '@emotion/styled';
import { space, color, layout } from 'styled-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMusic, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const SongListContainer = styled(Box)`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  ${space}
  ${color}
  ${layout}
`;

const SongItem = styled(Flex)`
  list-style-type: none;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 18px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  button {
    border: none;
    padding: 6px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #2c3e50;
      color: #fff;
    }

    ${space}
    ${color}
    ${layout}
  }

  ${space}
  ${color}
  ${layout}
`;

const AddSongForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;

  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #2ecc71;
    color: #fff;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #27ae60;
    }
  }
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
    // Fetch songs when the component mounts
    dispatch(fetchSongs());
  }, [dispatch]);

  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');

  const handleUpdateSong = (id, title, artist) => {
    dispatch(updateSong({ id, title, artist }));
  };

  const handleDeleteSong = (id) => {
    dispatch(deleteSong(id));
  };

  const handleAddSong = (e) => {
    e.preventDefault();

    if (newSongTitle && newSongArtist) {
      dispatch(addSong({ title: newSongTitle, artist: newSongArtist }));
      setNewSongTitle('');
      setNewSongArtist('');
    }
  };


  return (
    <SongListContainer>
      {loading && <Loader>Loading...</Loader>}
      {error && <Error>Error: {error}</Error>}
      <AddSongForm onSubmit={handleAddSong}>
        <input
          type="text"
          placeholder="Title"
          value={newSongTitle}
          onChange={(e) => setNewSongTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artist"
          value={newSongArtist}
          onChange={(e) => setNewSongArtist(e.target.value)}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faPlus} className="mr-1" />
          Add Song
        </button>
      </AddSongForm>
      <ul className="flex flex-col gap-3 p-3">
        {songs.map((song) => (
          <SongItem
            key={song.id}
            className="flex flex-col lg:flex-row items-center lg:justify-between p-3"
          >
            <div className="mb-2 lg:mb-0 lg:mr-4 flex items-center">
              <FontAwesomeIcon icon={faMusic} className="mr-2 text-blue-500" />
              <div>
                <strong>{song.title}</strong>
                <span className="text-gray-500 block"> by {song.artist}</span>
              </div>
            </div>
            <div className="flex flex-nowrap">
              <button
                className="m-2 bg-blue-500 flex"
                onClick={() =>
                  handleUpdateSong(song.id, 'Updated Song', 'Updated Artist')
                }
              >
                <FontAwesomeIcon icon={faEdit} className="mr-0.5 text-sm" />
                Update
              </button>
              <button
                className="m-2 bg-gray-200 flex items-center text-black"
                onClick={() => handleDeleteSong(song.id)}
              >
                <FontAwesomeIcon icon={faTrash} className="mr-0.5 text-sm" />
                Delete
              </button>
            </div>
          </SongItem>
        ))}
      </ul>
    </SongListContainer>
  );
}

export default SongList;
