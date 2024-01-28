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
  faInfoCircle,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faTwitter,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import gd from "../assets/5gada.png";
import hb from "../assets/hayubk.png";
import bot from "../assets/bot.jpg";
import portf from "../assets/portf.png";

const SongListContainer = styled(Box)`
  width: 95%;
  max-width: 97vw;
  overflow-x: hidden;
  margin: 0 auto;

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

  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongArtist, setNewSongArtist] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingSong, setIsAddingSong] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openUpdateModal = (song) => {
    setSelectedSong(song);
    setNewSongTitle(song.title); 
    setNewSongArtist(song.artist);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedSong(null); 
    setNewSongTitle(""); 
    setNewSongArtist(""); 
  };

  const handleUpdateSong = (id, title, artist) => {
    dispatch(updateSong({ id, title, artist }));
    closeUpdateModal(); 
  };

  const handleDeleteSong = (id) => {
    dispatch(deleteSong(id));
  };

  const handleAddSong = async (e) => {
    e.preventDefault();

    if (newSongTitle && newSongArtist && !isAddingSong) {
      setIsAddingSong(true); 
      setNewSongTitle("");
      setNewSongArtist("");
      closeModal(); 

      await dispatch(addSong({ title: newSongTitle, artist: newSongArtist }));

      setIsAddingSong(false);
    }
  };

  const [moreInfBar, setMoreInfoBar] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  useEffect(() => {
    const handleResize = () => {
     
      setMoreInfoBar(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);

  
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <SongListContainer className="flex flex-wrap justify-center relative">
      {moreInfBar && (
        <button
          onClick={() => setShowMoreInfo(true)}
          className=" fixed top-1 right-1 bg-gray-300  text-black p-2 rounded-lg"
        >
          <FontAwesomeIcon icon={faInfoCircle} />
        </button>
      )}
      {showMoreInfo && (
        <div className="fixed top-0  h-full scroll-m-0 bg-white">
          <button
            onClick={() => setShowMoreInfo(false)}
            className=" absolute right-1 bg-gray-300  text-black p-2 rounded-lg"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
          <MoreInfo />
        </div>
      )}

      <div className=" border mr-4 rounded-lg shadow-lg md:w-4/6 w-11/12">
        {" "}
        {loading && <Loader>Loading...</Loader>}
        {error && <Error>Error: {error}</Error>}
        <button
          className="m-2 rounded bg-gray-300 text-black p-2"
          onClick={openModal}
        >
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
            <button className="bg-blue-500" type="submit">
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Add Song
            </button>
          </AddSongForm>
        </Modal>
        {/* Update Modal */}
        <Modal
          isOpen={isUpdateModalOpen}
          onRequestClose={closeUpdateModal}
          className="absolute top-1/2 left-1/2 transform bg-white -translate-x-1/2 -translate-y-1/2 border-none rounded shadow-md max-h-70vh w-70vw max-w-400px p-8"
          contentLabel="Update Song Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the overlay color and opacity
            },
          }}
        >
          {selectedSong && (
            <AddSongForm
              onSubmit={(e) =>
                handleUpdateSong(selectedSong.id, newSongTitle, newSongArtist)
              }
            >
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
              <button className="bg-blue-500" type="submit">
                <FontAwesomeIcon icon={faEdit} className="mr-1" />
                Update Song
              </button>
            </AddSongForm>
          )}
        </Modal>
        <ul className="flex flex-col gap-3 p-3">
          {songs?.map((song) => (
            <SongItem
              key={song.id}
              className="flex flex-col lg:flex-row lg:justify-between p-3"
            >
              <div className="mb-2 lg:mb-0 lg:mr-4 flex items-center">
                <FontAwesomeIcon
                  icon={faMusic}
                  className="mr-2 p-3 bg-gray-200 rounded-md text-3xl text-blue-500"
                />
                <div>
                  <strong>{song.title}</strong>
                  <span className="text-gray-500 block"> by {song.artist}</span>
                </div>
              </div>

              <div className="flex flex-nowrap">
                <button
                  className="m-3 bg-blue-500 flex"
                  onClick={() => openUpdateModal(song)}
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-0.5 text-sm" />
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
      </div>

      {!moreInfBar && (
        <div className="w-1/5">
          <MoreInfo />
        </div>
      )}
    </SongListContainer>
  );
}

export default SongList;

function MoreInfo() {
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold  text-blue-500">My other works</h2>
        <p className=" text-sm  text-gray-600">Check them here</p>

        <div className="grid grid-cols-2  gap-4 mb-10">
          <a
            href="https://5gada.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center group"
          >
            <img
              src={gd}
              alt="Image 1"
              className="max-w-full h-auto border border-gray-300 shadow-md transition-transform transform group-hover:scale-105"
            />
          </a>
          <a
            href="https://hayubk.5gada.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center group"
          >
            <img
              src={hb}
              alt="Image 2"
              className="max-w-full h-auto border border-gray-300 shadow-md transition-transform transform group-hover:scale-105"
            />
          </a>
          <a
            href="https://t.me/JU_exam_store_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center group"
          >
            <img
              src={bot}
              alt="Image 3"
              className="max-w-full h-auto border border-gray-300 shadow-md transition-transform transform group-hover:scale-105"
            />
          </a>
        </div>

        <h2 className="text-2xl font-bold  text-blue-500">
          My Portfolio links
        </h2>
        <p className=" text-sm  text-gray-600">Check them here</p>

        <div className="grid grid-cols-2  gap-4 mb-10">
          <a
            href="https://5gada.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center group"
          >
            <img
              src={portf}
              alt="Image 1"
              className="max-w-full h-auto border border-gray-300 shadow-md transition-transform transform group-hover:scale-105"
            />
          </a>
        </div>

        <h2 className="text-2xl font-bold  text-blue-500">Social Networks</h2>
        <p className=" text-sm  text-gray-600">Check them here</p>

        <div className="flex gap-3">
          <a
            href="https://linkedin.com/in/tokuma-abdisa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center group"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-2xl text-blue-500"
            />
          </a>
          <a
            href="https://github.com/tokukiyu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center group"
          >
            <FontAwesomeIcon icon={faGithub} className="text-2xl" />
          </a>
        </div>
      </div>
    </>
  );
}
