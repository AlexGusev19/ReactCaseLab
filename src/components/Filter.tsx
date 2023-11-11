import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import { VehicleFilter, VehicleType } from "./../data/vehicles/contracts";
import { VehicleTypeSelect } from "./VehicleTypeSelect";


interface IFilter {
    callbackFilterChange(filterParam: VehicleFilter): void;
}

export const Filter: React.FC<IFilter> = ({ callbackFilterChange }) => {
    const [valueSearch, setValueSearch] = useState('');
    const [valueTypeVehicle, setValueTypeVehicle] = useState<VehicleType | null>(null);

    const inputSearch = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputSearch.current) {
            inputSearch.current.focus();
        }
    }, []);    

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setValueSearch(event.target.value);
        callbackFilterChange(
            {
                title: event.target.value,
                type: valueTypeVehicle
            }
        );
    }

    function handleSelectChange(value: VehicleType | null) {
        setValueTypeVehicle(value);
        callbackFilterChange(
            {
                title: valueSearch,
                type: value
            }
        );
    }

    return (
        <div>
            <input 
                type="search"
                value={valueSearch} 
                onChange={handleInputChange} 
                style={
                    {
                        width: '220px',
                        height: '30px', 
                        fontSize: '16px',
                        marginRight: '5px'
                    }
                }
                placeholder="Введите поисковую строку"
                ref={inputSearch}
            />
            <VehicleTypeSelect value={valueTypeVehicle} onChange={handleSelectChange}/>
        </div>
    );
}
