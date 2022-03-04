import html2canvas from "html2canvas";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useRouteMatch,
} from "react-router-dom";
import { URL_PATTERN } from "../forms/utils/validation";
import CloseButton from "../partials/CloseButton";
import HacsQRCode from "./HacsQRCode";

export default function QRCodeManager(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { url: "texashacs.org/" } });

  const [formData, updateFormData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [previewing, setPreviewing] = useState(false);

  const onSubmit = (data) => {
    updateFormData(data);
    setSubmitted(true);
    setPreviewing(true);
  };

  const closePreview = () => {
    setSubmitted(false);
    setPreviewing(false);
  };

  const canvasToImage = () => {
    const qrcode = document.getElementById("hacs-qrcode");
    return html2canvas(qrcode).then((canvas) => {
      document.getElementById("qrcode-wrapper").style.display = "block";
      // Create image from canvas
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.id = `${formData.name}`;
      img.src = canvas.toDataURL();

      return img;
    });
  };

  const handleDownload = () => {
    var link = document.createElement("a");

    // Download image
    canvasToImage().then((img) => {
      link.href = img.src;
      link.download = `${formData.name}.png`;
      link.click();
    });
  };

  const navigate = useNavigate();
  const handleMobileDownload = () => {
    canvasToImage().then((img) => {
      navigate(formData.name, { state: { src: img.src } });
    });
  };

  return (
    <Fragment>
      <Outlet />
      <section className="qrcode-manager">
        {editing && submitted ? (
          <HacsQRCode url={formData.url} hideFullSize />
        ) : null}
        <h2 className="form-group-title" onClick={() => setEditing(!editing)}>
          QR Code Generator
        </h2>
        {editing ? (
          <div className="create-qrcode admin-edit">
            {submitted ? (
              <div className="qrcode-display-container flex">
                <HacsQRCode
                  url={formData.url}
                  preview={previewing}
                  hideFullSize
                />
                <div className="flex-row">
                  <p className="filename">{formData.name}.png</p>
                  <CloseButton icon onClick={closePreview} />
                  <button
                    id="download-qrcode-button"
                    className="button"
                    onClick={handleDownload}
                  >
                    Download
                  </button>
                  <button
                    className="button"
                    id="download-qrcode-button-mobile"
                    onClick={handleMobileDownload}
                  >
                    Download
                  </button>
                </div>
              </div>
            ) : (
              <form
                id="create-qrcode-form"
                className="form-wrapper"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="form-group">
                  <label htmlFor="url">URL</label>
                  <p>{errors.url?.message}</p>
                  <input
                    id="qrcode-url-edit"
                    className={`form-control-small`}
                    placeholder="ex.: texashacs.org/develop"
                    {...register("url", {
                      required: "A valid URL is required.",
                      pattern: URL_PATTERN,
                    })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">QR Code Name</label>
                  <p>{errors.name?.message}</p>
                  <input
                    id="qrcode-name-edit"
                    className={`form-control-small`}
                    placeholder="ex.: Newsletter Link"
                    {...register("name", {
                      required: "A name is required.",
                      minLength: {
                        value: 4,
                        message: "Name must be at least 4 characters long.",
                      },
                    })}
                  />
                </div>
                <div className="button-container flex-row">
                  <button type="submit" className="button">
                    Create
                  </button>
                  <button
                    className="button"
                    onClick={() => setEditing(!editing)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div onClick={() => setEditing(!editing)}>
            <p>
              <span className="editable">Add QR Code</span>
            </p>
            {/* TODO: Add X mark to close dropdown */}
          </div>
        )}
      </section>
    </Fragment>
  );
}
