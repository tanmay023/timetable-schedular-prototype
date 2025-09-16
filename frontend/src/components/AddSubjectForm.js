import React, {useState} from 'react';
import axios from 'axios';

const AddSubjectForm = ({onAddSubject}) => {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        credits: '',
        department: '',
        semester: '',
        lectureHours: '',
        labHours: '',
        type: 'Core'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/subjects', formData);
            onAddSubject();
        } catch (error) {
            console.error('Error adding subject:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add New Subject</h3>
            <input type="text" name="name" placeholder="Subject Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="code" placeholder="Subject Code" value={formData.code} onChange={handleChange} required />
            <input type="number" name="credits" placeholder="Credits" value={formData.credits} onChange={handleChange} required />
            <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
            <input type="number" name="semester" placeholder="Semester" value={formData.semester} onChange={handleChange} required />
            <input type="number" name="lectureHours" placeholder="Lecture Hours" value={formData.lectureHours} onChange={handleChange} />
            <input type="number" name="labHours" placeholder="Lab Hours" value={formData.labHours} onChange={handleChange} />
            <select name="type" value={formData.type} onChange={handleChange} required>
                <option value="Core">Core</option>
                <option value="Elective">Elective</option>
                <option value="Lab">Lab</option>
            </select>
            <button type="submit">Add Subject</button>
        </form>
    );
}

export default AddSubjectForm;

// import React, { useState } from 'react';
// import axios from 'axios';
// import './AddSubjectForm.css';

// const AddSubjectForm = ({ onAddSubject, onCancel, isSubmitting = false }) => {
//     const [formData, setFormData] = useState({
//         name: '',
//         code: '',
//         credits: '',
//         department: '',
//         semester: '',
//         lectureHours: '',
//         labHours: '',
//         type: 'Core'
//     });

//     const [errors, setErrors] = useState({});
//     const [touched, setTouched] = useState({});
//     const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);

//     // Field validation rules
//     const validateField = (name, value) => {
//         switch (name) {
//             case 'name':
//                 if (!value.trim()) return 'Subject name is required';
//                 if (value.length < 3) return 'Subject name must be at least 3 characters';
//                 if (value.length > 100) return 'Subject name must be less than 100 characters';
//                 return '';
            
//             case 'code':
//                 if (!value.trim()) return 'Subject code is required';
//                 if (!/^[A-Z]{2,5}\d{2,4}$/i.test(value)) return 'Invalid code format (e.g., CS101, MATH201)';
//                 return '';
            
//             case 'credits':
//                 if (!value) return 'Credits are required';
//                 if (value < 1 || value > 10) return 'Credits must be between 1 and 10';
//                 return '';
            
//             case 'department':
//                 if (!value.trim()) return 'Department is required';
//                 if (value.length < 2) return 'Department name must be at least 2 characters';
//                 return '';
            
//             case 'semester':
//                 if (!value) return 'Semester is required';
//                 if (value < 1 || value > 8) return 'Semester must be between 1 and 8';
//                 return '';
            
//             case 'lectureHours':
//                 if (value && (value < 0 || value > 20)) return 'Lecture hours must be between 0 and 20';
//                 return '';
            
//             case 'labHours':
//                 if (value && (value < 0 || value > 20)) return 'Lab hours must be between 0 and 20';
//                 return '';
            
//             default:
//                 return '';
//         }
//     };

//     // Validate all fields
//     const validateForm = () => {
//         const newErrors = {};
//         Object.keys(formData).forEach(key => {
//             const error = validateField(key, formData[key]);
//             if (error) newErrors[key] = error;
//         });
        
//         // Additional validation: at least one of lecture or lab hours should be specified
//         if (!formData.lectureHours && !formData.labHours) {
//             newErrors.hours = 'Please specify either lecture hours or lab hours (or both)';
//         }
        
//         return newErrors;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
        
//         // Update form data
//         setFormData({
//             ...formData,
//             [name]: value
//         });

//         // Clear error for this field
//         if (errors[name]) {
//             setErrors({
//                 ...errors,
//                 [name]: ''
//             });
//         }

//         // Real-time validation for touched fields
//         if (touched[name]) {
//             const error = validateField(name, value);
//             setErrors({
//                 ...errors,
//                 [name]: error
//             });
//         }
//     };

//     const handleBlur = (e) => {
//         const { name, value } = e.target;
        
//         // Mark field as touched
//         setTouched({
//             ...touched,
//             [name]: true
//         });

//         // Validate field
//         const error = validateField(name, value);
//         setErrors({
//             ...errors,
//             [name]: error
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         // Validate entire form
//         const formErrors = validateForm();
//         setErrors(formErrors);
//         setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

//         // If there are errors, don't submit
//         if (Object.keys(formErrors).length > 0) {
//             return;
//         }

//         setIsSubmittingLocal(true);
        
//         try {
//             await axios.post('http://localhost:5000/api/subjects', {
//                 ...formData,
//                 credits: parseInt(formData.credits),
//                 semester: parseInt(formData.semester),
//                 lectureHours: formData.lectureHours ? parseInt(formData.lectureHours) : 0,
//                 labHours: formData.labHours ? parseInt(formData.labHours) : 0
//             });
            
//             onAddSubject(formData);
//         } catch (error) {
//             console.error('Error adding subject:', error);
            
//             // Handle specific error cases
//             if (error.response?.status === 400) {
//                 if (error.response.data.message?.includes('duplicate') || error.response.data.message?.includes('exists')) {
//                     setErrors({ code: 'Subject code already exists' });
//                 } else {
//                     setErrors({ general: error.response.data.message || 'Invalid data provided' });
//                 }
//             } else if (error.response?.status === 500) {
//                 setErrors({ general: 'Server error. Please try again later.' });
//             } else {
//                 setErrors({ general: 'Failed to add subject. Please check your connection and try again.' });
//             }
//         } finally {
//             setIsSubmittingLocal(false);
//         }
//     };

//     const handleReset = () => {
//         if (window.confirm('Are you sure you want to clear all fields?')) {
//             setFormData({
//                 name: '',
//                 code: '',
//                 credits: '',
//                 department: '',
//                 semester: '',
//                 lectureHours: '',
//                 labHours: '',
//                 type: 'Core'
//             });
//             setErrors({});
//             setTouched({});
//         }
//     };

//     const isFieldInvalid = (fieldName) => touched[fieldName] && errors[fieldName];
//     const isFieldValid = (fieldName) => touched[fieldName] && !errors[fieldName] && formData[fieldName];
//     const submitting = isSubmitting || isSubmittingLocal;

//     return (
//         <div className="add-subject-form-container">
//             {errors.general && (
//                 <div className="error-banner">
//                     <span className="error-icon">⚠️</span>
//                     {errors.general}
//                 </div>
//             )}

//             <form onSubmit={handleSubmit} className="add-subject-form" noValidate>
//                 <div className="form-grid">
//                     {/* Subject Name */}
//                     <div className="form-group">
//                         <label htmlFor="name" className="form-label">
//                             Subject Name *
//                         </label>
//                         <div className="input-wrapper">
//                             <input 
//                                 type="text" 
//                                 id="name"
//                                 name="name" 
//                                 placeholder="Enter subject name (e.g., Introduction to Computer Science)" 
//                                 value={formData.name} 
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 required 
//                                 disabled={submitting}
//                                 className={`form-input ${isFieldInvalid('name') ? 'invalid' : ''} ${isFieldValid('name') ? 'valid' : ''}`}
//                             />
//                             <div className="input-status">
//                                 {isFieldValid('name') && <span className="valid-icon">✅</span>}
//                                 {isFieldInvalid('name') && <span className="invalid-icon">❌</span>}
//                             </div>
//                         </div>
//                         {errors.name && <div className="field-error">{errors.name}</div>}
//                     </div>

//                     {/* Subject Code */}
//                     <div className="form-group">
//                         <label htmlFor="code" className="form-label">
//                             Subject Code *
//                         </label>
//                         <div className="input-wrapper">
//                             <input 
//                                 type="text" 
//                                 id="code"
//                                 name="code" 
//                                 placeholder="Enter subject code (e.g., CS101)" 
//                                 value={formData.code} 
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 required 
//                                 disabled={submitting}
//                                 className={`form-input ${isFieldInvalid('code') ? 'invalid' : ''} ${isFieldValid('code') ? 'valid' : ''}`}
//                                 style={{ textTransform: 'uppercase' }}
//                             />
//                             <div className="input-status">
//                                 {isFieldValid('code') && <span className="valid-icon">✅</span>}
//                                 {isFieldInvalid('code') && <span className="invalid-icon">❌</span>}
//                             </div>
//                         </div>
//                         {errors.code && <div className="field-error">{errors.code}</div>}
//                     </div>

//                     {/* Credits */}
//                     <div className="form-group">
//                         <label htmlFor="credits" className="form-label">
//                             Credits *
//                         </label>
//                         <div className="input-wrapper">
//                             <input 
//                                 type="number" 
//                                 id="credits"
//                                 name="credits" 
//                                 placeholder="Enter credits (1-10)" 
//                                 value={formData.credits} 
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 required 
//                                 min="1"
//                                 max="10"
//                                 disabled={submitting}
//                                 className={`form-input ${isFieldInvalid('credits') ? 'invalid' : ''} ${isFieldValid('credits') ? 'valid' : ''}`}
//                             />
//                             <div className="input-status">
//                                 {isFieldValid('credits') && <span className="valid-icon">✅</span>}
//                                 {isFieldInvalid('credits') && <span className="invalid-icon">❌</span>}
//                             </div>
//                         </div>
//                         {errors.credits && <div className="field-error">{errors.credits}</div>}
//                     </div>

//                     {/* Department */}
//                     <div className="form-group">
//                         <label htmlFor="department" className="form-label">
//                             Department *
//                         </label>
//                         <div className="input-wrapper">
//                             <input 
//                                 type="text" 
//                                 id="department"
//                                 name="department" 
//                                 placeholder="Enter department (e.g., Computer Science)" 
//                                 value={formData.department} 
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 required 
//                                 disabled={submitting}
//                                 className={`form-input ${isFieldInvalid('department') ? 'invalid' : ''} ${isFieldValid('department') ? 'valid' : ''}`}
//                             />
//                             <div className="input-status">
//                                 {isFieldValid('department') && <span className="valid-icon">✅</span>}
//                                 {isFieldInvalid('department') && <span className="invalid-icon">❌</span>}
//                             </div>
//                         </div>
//                         {errors.department && <div className="field-error">{errors.department}</div>}
//                     </div>

//                     {/* Semester */}
//                     <div className="form-group">
//                         <label htmlFor="semester" className="form-label">
//                             Semester *
//                         </label>
//                         <div className="input-wrapper">
//                             <input 
//                                 type="number" 
//                                 id="semester"
//                                 name="semester" 
//                                 placeholder="Enter semester (1-8)" 
//                                 value={formData.semester} 
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 required 
//                                 min="1"
//                                 max="8"
//                                 disabled={submitting}
//                                 className={`form-input ${isFieldInvalid('semester') ? 'invalid' : ''} ${isFieldValid('semester') ? 'valid' : ''}`}
//                             />
//                             <div className="input-status">
//                                 {isFieldValid('semester') && <span className="valid-icon">✅</span>}
//                                 {isFieldInvalid('semester') && <span className="invalid-icon">❌</span>}
//                             </div>
//                         </div>
//                         {errors.semester && <div className="field-error">{errors.semester}</div>}
//                     </div>

//                     {/* Subject Type */}
//                     <div className="form-group">
//                         <label htmlFor="type" className="form-label">
//                             Subject Type *
//                         </label>
//                         <div className="input-wrapper">
//                             <select 
//                                 id="type"
//                                 name="type" 
//                                 value={formData.type} 
//                                 onChange={handleChange}
//                                 required 
//                                 disabled={submitting}
//                                 className="form-select"
//                             >
//                                 <option value="Core">Core Subject</option>
//                                 <option value="Elective">Elective</option>
//                                 <option value="Lab">Laboratory</option>
//                             </select>
//                             <div className="select-arrow">▼</div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Hours Section */}
//                 <div className="hours-section">
//                     <h4 className="section-title">
//                         <span className="section-icon">⏰</span>
//                         Weekly Hours
//                     </h4>
//                     <div className="hours-grid">
//                         <div className="form-group">
//                             <label htmlFor="lectureHours" className="form-label">
//                                 Lecture Hours
//                             </label>
//                             <div className="input-wrapper">
//                                 <input 
//                                     type="number" 
//                                     id="lectureHours"
//                                     name="lectureHours" 
//                                     placeholder="Enter lecture hours" 
//                                     value={formData.lectureHours} 
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     min="0"
//                                     max="20"
//                                     disabled={submitting}
//                                     className={`form-input ${isFieldInvalid('lectureHours') ? 'invalid' : ''} ${isFieldValid('lectureHours') ? 'valid' : ''}`}
//                                 />
//                                 <div className="input-status">
//                                     {isFieldValid('lectureHours') && <span className="valid-icon">✅</span>}
//                                     {isFieldInvalid('lectureHours') && <span className="invalid-icon">❌</span>}
//                                 </div>
//                             </div>
//                             {errors.lectureHours && <div className="field-error">{errors.lectureHours}</div>}
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="labHours" className="form-label">
//                                 Lab Hours
//                             </label>
//                             <div className="input-wrapper">
//                                 <input 
//                                     type="number" 
//                                     id="labHours"
//                                     name="labHours" 
//                                     placeholder="Enter lab hours" 
//                                     value={formData.labHours} 
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     min="0"
//                                     max="20"
//                                     disabled={submitting}
//                                     className={`form-input ${isFieldInvalid('labHours') ? 'invalid' : ''} ${isFieldValid('labHours') ? 'valid' : ''}`}
//                                 />
//                                 <div className="input-status">
//                                     {isFieldValid('labHours') && <span className="valid-icon">✅</span>}
//                                     {isFieldInvalid('labHours') && <span className="invalid-icon">❌</span>}
//                                 </div>
//                             </div>
//                             {errors.labHours && <div className="field-error">{errors.labHours}</div>}
//                         </div>
//                     </div>
//                     {errors.hours && <div className="field-error section-error">{errors.hours}</div>}
//                 </div>

//                 {/* Form Actions */}
//                 <div className="form-actions">
//                     <button 
//                         type="button" 
//                         onClick={handleReset}
//                         className="btn btn-outline"
//                         disabled={submitting}
//                     >
//                         <span className="btn-icon">🔄</span>
//                         Clear Form
//                     </button>
                    
//                     {onCancel && (
//                         <button 
//                             type="button" 
//                             onClick={onCancel}
//                             className="btn btn-secondary"
//                             disabled={submitting}
//                         >
//                             <span className="btn-icon">❌</span>
//                             Cancel
//                         </button>
//                     )}
                    
//                     <button 
//                         type="submit" 
//                         className="btn btn-primary"
//                         disabled={submitting || Object.keys(errors).length > 0}
//                     >
//                         <span className="btn-icon">
//                             {submitting ? '⏳' : '💾'}
//                         </span>
//                         {submitting ? 'Adding Subject...' : 'Add Subject'}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddSubjectForm;