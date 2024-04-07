import { Popover, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import "./Header.css";
import Modal from "react-modal"; // Assuming you're using react-modal library
import { CiCamera } from "react-icons/ci";
import { CiVideoOn } from "react-icons/ci";
import { IoDocumentOutline } from "react-icons/io5";
import { Switch } from "@headlessui/react";
import { MdOutlineFlipCameraIos } from "react-icons/md";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Footer = ({
  resolutions,
  onChangeResolution,
  onChangeFrameRate,
  selectedFrameRate,
  selectedResolution,
  handleSwitchCamera,
  mode
}) => {
  const [enabled, setEnabled] = useState(false);
  const navigate = useNavigate();

  console.log(enabled, "enabled");
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="footer">
      <div>
        <div className="top-16 w-full flex justify-around items-center max-w-sm px-4">
          <div>
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                            onClick={togglePopover}

                  className={`
            ${open ? "text-white" : "text-white/90"}
            flex justify-evenly items-center  py-3 my-2  border  border-red text-white rounded camera-opt-btn `}
                  style={{ backgroundColor: "#53ade5", width: "15rem" }}
                >
                  <span>Camera Opttions</span>

                  {isOpen ? (
             <AiFillCaretUp />

            ) : (
              <AiFillCaretDown />

            )}
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute w-60 z-10 mt-3 -top-full left-1/2 transform -translate-x-1/2 px-4 sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                      <div className="relative grid gap-8 bg-white p-5 ">
                        <a
                        onClick={()=> navigate('/video-mode')}
                          href="#"
                          className={`${mode=="Video"? "active-cam-opt" :""}  -m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50 `}
                        >
                          <div className="ml-4  w-full flex justify-center items-center ">
                            <p className="text-sm font-medium text-black w-1/2">
                              Video
                            </p>
                            <CiVideoOn
                              className="w-1/2"
                              color="#000000"
                              size={25}
                            />
                          </div>
                        </a>

                        <a
                                                onClick={()=> navigate('/photo-mode')}

                          href="#"
                          className={`${mode=="photo"? "active-cam-opt" :""} -m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50`}
                        >
                          <div className="ml-4  w-full flex justify-center items-center ">
                            <p className="text-sm font-medium text-black w-1/2">
                              Photo
                            </p>
                            <CiCamera
                              className="w-1/2"
                              color="#000000"
                              size={25}
                            />
                          </div>
                        </a>

                        <a
                          href="#"
                          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                        >
                          <div className="ml-4  w-full flex justify-center items-center ">
                            <p className="text-sm font-medium text-black w-1/2">
                              Doc Scan
                            </p>
                            <IoDocumentOutline
                              className="w-1/2"
                              color="#000000"
                              size={25}
                            />
                          </div>
                        </a>

                        <a
                        onClick={()=>handleSwitchCamera()}
                          href="#"
                          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                        >
                          <div className="ml-4  w-full flex justify-center items-center ">
                            <p className="text-sm font-medium text-black w-1/2">
                              Flip Camera
                            </p>
                            <MdOutlineFlipCameraIos
                              className="w-1/2"
                              color="#000000"
                              size={25}
                            />
                          </div>
                        </a>

                        <a
                          href="#"
                          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                        >
                        
                          <div className="ml-4  w-full flex justify-center items-center ">
                            <p className="text-sm font-medium text-black w-1/2">
                              Resolution:
                            </p>
                            <div className="w-1/2 flex justify-center">
                          
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className="h-8"
                                sx={{backgroundColor:"#53ade5",color:"#fff"}}
                                value={selectedResolution}
                                onChange={onChangeResolution}
                              >
                                {resolutions.map((res, index) => (
                                  <MenuItem   value={JSON.stringify(res.value)} >{res.label}</MenuItem>
                                ))}
                              </Select>
                            </div>
                          </div>
                        </a>

                        <a
                          href="#"
                          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                        >
                          <div className="ml-4  w-full flex justify-center items-center ">
                            <p className="text-sm font-medium text-black w-1/2">
                              Frame Rate:
                            </p>
                            <div className="w-1/2 flex justify-center">
                      

                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className="h-8"
                                sx={{backgroundColor:"#53ade5",color:"#fff"}}

                                value={selectedFrameRate}
                                onChange={onChangeFrameRate}
                              >
                                <MenuItem value={30}>30</MenuItem>
                                <MenuItem value={60}>60</MenuItem>
                                <MenuItem value={90}>90</MenuItem>
                              </Select>
                            </div>
                          </div>
                        </a>

                        <a
                          href="#"
                          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                        >
                          <div className="ml-4  w-full flex justify-center items-center ">
                            <p className="text-sm font-medium text-black w-1/2">
                              Pose Model:
                            </p>
                            <div className="w-1/2 flex justify-center">
                              <Switch
                                checked={enabled}
                                onChange={setEnabled}
                                className={`${
                                  enabled ? "bg-teal-900" : "bg-teal-700"
                                } relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                style={{ backgroundColor: "#53ade5" }}
                              >
                                <span className="sr-only ">Use setting</span>
                                <span
                                  aria-hidden="true"
                                  className={`${
                                    enabled ? "translate-x-9" : "translate-x-0"
                                  }  pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                              </Switch>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
          </div>
          <div>
          <h1 className="text-center">Mode : {(mode=="Video")?"Video":"Photo"} </h1>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Footer;
