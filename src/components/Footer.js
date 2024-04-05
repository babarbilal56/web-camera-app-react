import { Popover, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import "./Header.css";
import Modal from "react-modal"; // Assuming you're using react-modal library
import { CiCamera } from "react-icons/ci";
import { CiVideoOn } from "react-icons/ci";
import { IoDocumentOutline } from "react-icons/io5";
import { Switch } from "@headlessui/react";

const Footer = ({ resolutions, onChangeResolution }) => {
  const [enabled, setEnabled] = useState(false);

  console.log(enabled, "enabled");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedResolution, setSelectedResolution] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // const handleSelectResolutionChange = (event) => {
  //   // setResolution({

  //   // })
  //   setSelectedResolution(event.target.value);
  // };

  return (
    <div className="footer">
      <div>
        <div className="top-16 w-full max-w-sm px-4">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`
            ${open ? "text-white" : "text-white/90"}
             py-3 my-2  border  border-red text-white rounded `}
                  style={{ backgroundColor: "#53ade5", width: "15rem" }}
                >
                  <span>Camera Opttions</span>
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
                          href="#"
                          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
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
                          href="#"
                          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                        >
                          <div className="ml-4">
                            <p className="text-sm font-medium text-black">
                              Photo
                            </p>
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
                          href="#"
                          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                        >
                          <div className="ml-4  w-full flex justify-center items-center ">
                            <p className="text-sm font-medium text-black w-1/2">
                              Flip Camera
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
                          {/* <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                            <IconOne aria-hidden="true" />
                          </div> */}
                          <div className="ml-4  w-full flex justify-center items-center ">
                            <p className="text-sm font-medium text-black w-1/2">
                              Resolution:
                            </p>
                            <div className="w-1/2 flex justify-center">
                              <select
                                // value={selectedResolution}
                                onChange={onChangeResolution}
                                className="block w-full px-4 py-2 leading-tight  border border-gray-400 rounded-md appearance-none focus:outline-none focus:bg-white focus:border-gray-600"
                                style={{ backgroundColor: "#53ade5" }}
                              >
                                {resolutions.map((res, index) => (
                                  <option
                                    key={index}
                                    value={JSON.stringify(res.value)}
                                  >
                                    {res.label}
                                  </option>
                                ))}
                              </select>
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
                              <select
                                value={selectedOption}
                                onChange={handleSelectChange}
                                className="block w-full px-4 py-2 leading-tight  border border-gray-400 rounded-md appearance-none focus:outline-none focus:bg-white focus:border-gray-600"
                                style={{ backgroundColor: "#53ade5" }}
                              >
                                <option value="">Select</option>
                                <option value="option1">30</option>
                                <option value="option2">60</option>
                                <option value="option3">90</option>
                              </select>
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
      </div>
    </div>
  );
};

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  );
}

export default Footer;
