import React from 'react';

const FormGroup = ({ label, id, type, required, disabled, checkbox, value, onChange, children }) => {
    return (
        <div className={`form-group ${checkbox ? 'checkbox' : ''}`}>
            <label htmlFor={id}>{label}</label>
            {type === 'checkbox' ? (
                <>
                    <input type={type} id={id} name={id} checked={value} onChange={onChange} />
                    <label htmlFor={id} className='toggle-button'></label>
                </>
            ) : (
                <input required={required} disabled={disabled} type={type} id={id} name={id} value={value} onChange={onChange} />
            )}
            {children}
        </div>
    );
}

export default FormGroup;
