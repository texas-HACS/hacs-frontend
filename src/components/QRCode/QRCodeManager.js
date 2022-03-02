import html2canvas from "html2canvas";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    updateFormData(data);
    setSubmitted(true);
  };

  const handleDownload = () => {
    html2canvas(document.querySelector("#full-res-qrcode")).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${formData.name}.png`;
      document.getElementById("full-res-qrcode-wrapper").style.display =
        "block";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <section className="qrcode-manager">
      <div className="create-qrcode">
        {submitted ? (
          <div className="qrcode-display-container flex">
            <HacsQRCode url={formData.url} />
            <div className="flex-row">
              <p className="filename">{formData.name}.png</p>
              <CloseButton icon onClick={() => setSubmitted(false)} />
              <button className="button" onClick={handleDownload}>
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
            <button type="submit" className="button">
              Create QR Code
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
