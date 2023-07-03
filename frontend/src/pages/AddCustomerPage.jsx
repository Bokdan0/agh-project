import { MainNav } from "@/components/MainNav";
import { navigationLinks } from "../config/navigationLinks";
import { UserNav } from "./CustomersPage/components/UserNav";
import { useState } from "react";

export const AddCustomerPage = () => {
  const [Imie, setName] = useState("");
  const [Nazwisko, setSurname] = useState("");
  const [Email, setEmail] = useState("");
  const [NumerTelefonu, setPhoneNumber] = useState("");

  const daneImie = (event) => {
    setName(event.target.value);
  };

  const daneNazwisko = (event) => {
    setSurname(event.target.value);
  };
  const danyEmail = (event) => {
    setEmail(event.target.value);
  };
  const danyNumerTelefonu = (event) => {
    setPhoneNumber(event.target.value);
  };

  const daneDoFormularza = async (e) => {
    console.log("mamy problem")
    e.preventDefault();
    if (Imie === "") return;
    if (Email === "") return;
    if (NumerTelefonu === "" || NumerTelefonu.length <9 || NumerTelefonu.length >12) return;

    const customerData = {
      name: Imie,
      surname: Nazwisko,
      email: Email,
      phone_number: NumerTelefonu,
    };

    const response = await fetch("http://127.0.0.1:8000/customers", {
      method: "POST",
      body: JSON.stringify(customerData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);

    setName("");
    setSurname("");
    setEmail("");
    setPhoneNumber("");
  };
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" links={navigationLinks} />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Add customer</h2>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex"></div>
      </div>
      <form onSubmit={daneDoFormularza} className="dodajKlientaDoFormularza">
        <label>Name</label>
        <input
          onChange={daneImie}
          value={Imie}
          placeholder="Grzegorz"
        ></input>
        <label>Surname</label>
        <input
          onChange={daneNazwisko}
          value={Nazwisko}
          placeholder="Brzęczyszczykiewicz"
        ></input>
        <label>Email</label>
        <input
          onChange={danyEmail}
          value={Email}
          placeholder="Grzegorz@Brzęczyszczykiewicz.pl"
        ></input>
        <label>Phone Number</label>
        <input
          onChange={danyNumerTelefonu}
          value={NumerTelefonu}
          placeholder="000 021 370"
        ></input>
        <button type="submit" onClick={daneDoFormularza}>Submit</button>
      </form>
    </div>
  );
};