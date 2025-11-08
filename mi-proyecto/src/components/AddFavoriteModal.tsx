"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createPortal } from "react-dom";

interface AddFavoriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: { customName: string; description: string }) => void;
}

export default function AddFavoriteModal({
  isOpen,
  onClose,
  onSubmit,
}: AddFavoriteModalProps) {
  if (typeof window === "undefined") return null;

  const formik = useFormik({
    initialValues: {
      customName: "",
      description: "",
    },
    validationSchema: Yup.object({
      customName: Yup.string()
        .min(2, "El nombre es muy corto")
        .required("El nombre es obligatorio"),
      description: Yup.string()
        .min(5, "La descripción es muy corta")
        .required("La descripción es obligatoria"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    },
  });

  const modalContent = (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
        {/* Fondo oscuro */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        {/* Contenido centrado */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
              <Dialog.Title className="text-lg font-bold mb-4 text-center">
                Agregar a favoritos
              </Dialog.Title>

              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4"
              >
                <div>
                  <label className="block font-medium">Nombre personalizado</label>
                  <input
                    type="text"
                    name="customName"
                    value={formik.values.customName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full border rounded px-3 py-2"
                  />
                  {formik.touched.customName && formik.errors.customName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.customName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">Descripción</label>
                  <textarea
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full border rounded px-3 py-2"
                  />
                  {formik.touched.description && formik.errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.description}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={!formik.isValid}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );

  return createPortal(modalContent, document.body);
}
