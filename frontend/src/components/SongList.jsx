// src/components/SongList.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSong, deleteSong, addSong, fetchSongs } from "../songsSlice";
import { Box, Flex } from "rebass/styled-components";
import styled from "@emotion/styled";
import Modal from "react-modal";
import { space, color, layout } from "styled-system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faMusic,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

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
    color: #fff;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #2c3e50;
      color: #fff;
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
    if (songs.length === 0) {
      dispatch(fetchSongs());
    }
  }, [dispatch, songs]);

  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingSong, setIsAddingSong] = useState(false); // New state to track adding song status

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleUpdateSong = (id, title, artist) => {
    dispatch(updateSong({ id, title, artist }));
  };

  const handleDeleteSong = (id) => {
    dispatch(deleteSong(id));
  };

  const handleAddSong = async (e) => {
    e.preventDefault();

    if (newSongTitle && newSongArtist && !isAddingSong) {
      setIsAddingSong(true); // Set the flag to indicate adding song is in progress
      setNewSongTitle('');
      setNewSongArtist('');
      closeModal(); // Close the modal after successfully adding a song

      await dispatch(addSong({ title: newSongTitle, artist: newSongArtist }));

      setIsAddingSong(false); // Reset the flag after adding song is completed
    }
  };

  return (
    <SongListContainer>
      {loading && <Loader>Loading...</Loader>}
      {error && <Error>Error: {error}</Error>}
      <button className="m-2 rounded bg-gray-300 text-black p-2" onClick={openModal}>
        <FontAwesomeIcon icon={faPlus} className="mr-1" />
        Add Song
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="absolute top-1/2 left-1/2 transform bg-white -translate-x-1/2 -translate-y-1/2 border-none rounded shadow-md max-h-70vh w-70vw max-w-400px p-8"
        contentLabel="Add Song Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the overlay color and opacity
          },
        }}
      >
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
          <button className=" bg-blue-500" type="submit">
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Add Song
          </button>
        </AddSongForm>
      </Modal>
      <ul className="flex flex-col gap-3 p-3">
        {songs?.map((song) => (
          <SongItem
            key={song.id}
            className="flex flex-col lg:flex-row lg:justify-between p-3"
          >
            <div className="mb-2 lg:mb-0 lg:mr-4 flex items-center">
              <FontAwesomeIcon icon={faMusic} className="mr-2 p-3  bg-gray-200 rounded-md text-3xl text-blue-500" />
              <div>
                <strong>{song.title}</strong>
                <span className="text-gray-500 block"> by {song.artist}</span>
              </div>
            </div>

            <div className="flex flex-nowrap">
              <button
                className="m-3 bg-blue-500 flex"
                onClick={() =>
                  handleUpdateSong(song.id, "Updated Song", "Updated Artist")
                }
              >
                <FontAwesomeIcon icon={faEdit} className="mr-0.5  text-sm" />
                Update
              </button>
              <button
                className="m-3 bg-gray-200 flex items-center text-black"
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
