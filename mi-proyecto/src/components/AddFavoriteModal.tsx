'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type Props = {
  open: boolean;
  onClose: () => void;
  onSave?: (payload: { name: string; note: string }) => void;
  defaultName?: string;
};

// Esquema de validación con Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede superar los 50 caracteres')
    .required('El nombre es obligatorio'),
  note: Yup.string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(200, 'La descripción no puede superar los 200 caracteres')
    .required('La descripción es obligatoria'),
});

export default function AddFavoriteModal({ open, onClose, onSave, defaultName = '' }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!mounted) return null;
  if (!open) return null;

  const node = document.body;

  const modal = (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        animation: 'fadeIn 0.3s ease-out',
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(8px)',
        }}
      />
      
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '20px',
          padding: '32px',
          minWidth: '320px',
          maxWidth: '90%',
          width: '450px',
          zIndex: 10000,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          color: 'white',
          animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
          }}
        />

        <h3 
          style={{ 
            margin: 0, 
            marginBottom: '24px',
            fontSize: '24px',
            fontWeight: '600',
            textTransform: 'capitalize',
            background: 'linear-gradient(135deg, #fff, #e0e0e0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Agregar a favoritos
        </h3>

        <Formik
          initialValues={{
            name: defaultName,
            note: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSave?.(values);
            onClose();
          }}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                  Nombre <span style={{ color: '#ff6b9d' }}>*</span>
                </label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Ej: Mi Pokémon favorito"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: errors.name && touched.name 
                      ? '1px solid #ff6b9d' 
                      : '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                    if (!(errors.name && touched.name)) {
                      e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.4)';
                    }
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                    if (!(errors.name && touched.name)) {
                      e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                    }
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                />
                <ErrorMessage name="name">
                  {(msg) => (
                    <p style={{ 
                      color: '#ff6b9d', 
                      fontSize: '13px', 
                      marginTop: '6px',
                      marginBottom: 0,
                    }}>
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                  Descripción <span style={{ color: '#ff6b9d' }}>*</span>
                </label>
                <Field
                  as="textarea"
                  name="note"
                  placeholder="Agrega una nota sobre por qué es tu favorito..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: errors.note && touched.note 
                      ? '1px solid #ff6b9d' 
                      : '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontSize: '15px',
                    outline: 'none',
                    resize: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) => {
                    if (!(errors.note && touched.note)) {
                      e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.4)';
                    }
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
                    if (!(errors.note && touched.note)) {
                      e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                    }
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                />
                <ErrorMessage name="note">
                  {(msg) => (
                    <p style={{ 
                      color: '#ff6b9d', 
                      fontSize: '13px', 
                      marginTop: '6px',
                      marginBottom: 0,
                    }}>
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 24px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!isValid || !dirty}
              style={{
                padding: '10px 24px',
                borderRadius: '12px',
                border: 'none',
                background: (!isValid || !dirty)
                  ? 'rgba(150, 150, 150, 0.3)'
                  : 'linear-gradient(135deg, #ec4899 0%, #ef4444 100%)',
                color: 'white',
                fontSize: '15px',
                fontWeight: '600',
                cursor: (!isValid || !dirty) ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: (!isValid || !dirty) 
                  ? 'none'
                  : '0 4px 15px rgba(236, 72, 153, 0.4)',
                opacity: (!isValid || !dirty) ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (isValid && dirty) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f472b6 0%, #f87171 100%)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(236, 72, 153, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (isValid && dirty) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #ec4899 0%, #ef4444 100%)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(236, 72, 153, 0.4)';
                }
              }}
            >
              Guardar
            </button>
          </div>
            </Form>
          )}
        </Formik>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to { 
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          input::placeholder, textarea::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
        `}</style>
      </div>
    </div>
  );

  return createPortal(modal, node);
}