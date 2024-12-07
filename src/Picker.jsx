import React, { useState, useEffect } from 'react';

const n1 = "Nish2";   
const n2 = "Ryan5";   
const n3 = "Sreekar3"; 
const n4 = "Phin1";   
const n5 = "Rodrigo4"; 

const a = n1; 
const b = n2; 
const c = n3; 
const d = n4; 
const e = n5; 

const assignments = {
    [a]: b, // Nish2 -> Ryan5
    [b]: d, // Ryan5 -> Phin1
    [c]: e, // Sreekar3 -> Rodrigo4
    [d]: c, // Phin1 -> Sreekar3
    [e]: a  // Rodrigo4 -> Nish2
};

const ids = {
    [n1]: 2,
    [n2]: 5,
    [n3]: 3,
    [n4]: 1,
    [n5]: 4,
};

const NamePicker = () => {
    const [selectedName, setSelectedName] = useState('');
    const [assignedName, setAssignedName] = useState('');
    const [assignedID, setAssignedID] = useState(null);
    const [isAssigned, setIsAssigned] = useState(false);

    useEffect(() => {
        const storedAssignment = localStorage.getItem('isAssigned');
        const storedSelectedName = localStorage.getItem('selectedName');
        if (storedAssignment === 'true') {
            setIsAssigned(true);
            setSelectedName(storedSelectedName);
            setAssignedName(assignments[storedSelectedName]);
            setAssignedID(ids[storedSelectedName]);
        }
    }, []);

    const handleSelectName = () => {
        if (assignments[selectedName]) {
            setAssignedName(assignments[selectedName]);
            setAssignedID(ids[selectedName]);
            setIsAssigned(true);
            localStorage.setItem('isAssigned', 'true');
            localStorage.setItem('selectedName', selectedName);
        } else {
            setAssignedName('Please select a valid name.');
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0f8ff', maxWidth: '400px', margin: 'auto' }}>
            <h1 style={{ color: '#2c3e50' }}>🎁 Thambi Santa Name Picker 🎄</h1>
            <div>
                <select 
                    value={selectedName} 
                    onChange={(e) => setSelectedName(e.target.value)} 
                    style={{ padding: '10px', fontSize: '16px', width: '100%' }} 
                    disabled={isAssigned}
                >
                    <option value="">Select your name</option>
                    {Object.keys(assignments).map((name) => (
                        <option key={name} value={name}>{name.replace(/[0-9]/g, '')}</option>
                    ))}
                </select>
                <button 
                    onClick={handleSelectName} 
                    style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px', width: '100%' }} 
                    disabled={isAssigned}
                >
                    See Who You Got
                </button>
            </div>
            {assignedName && (
                <p style={{ marginTop: '20px', fontSize: '18px', color: '#2980b9' }}>
                    {selectedName.replace(/[0-9]/g, '')} is assigned to {assignedName.replace(/[0-9]/g, '')} (ID: {assignedID})
                </p>
            )}
        </div>
    );
};

export default NamePicker;