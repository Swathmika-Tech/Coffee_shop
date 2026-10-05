import React, { useState } from 'react';
import { Calendar, Users, MapPin, CheckCircle2, Compass, Award } from 'lucide-react';
import { Reservation } from '../types';

export const ReservationSection: React.FC = () => {
  const [resType, setResType] = useState<'table' | 'tasting_flight'>('tasting_flight');
  const [date, setDate] = useState('2026-10-10');
  const [time, setTime] = useState('11:30 AM');
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState('The Espresso Bar Counter');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const timeSlots = ['09:30 AM', '11:30 AM', '01:30 PM', '03:30 PM', '05:00 PM'];
  const seatingAreas = [
    'The Espresso Bar Counter (Direct Barista Interaction)',
    'The Sunlit Glasshouse Courtyard (Airy & Greenery)',
    'The Mezzanine Library (Quiet Work & Reading)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Please fill out all contact fields to complete your reservation.');
      return;
    }

    const res: Reservation = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      type: resType,
      date,
      time,
      guests,
      seatingArea,
      name,
      email,
      phone,
      notes,
      createdAt: new Date().toLocaleDateString(),
    };

    setConfirmedReservation(res);
  };

  return (
    <section id="reservations" className="py-20 bg-[#f5f2eb] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-2">
            Table Booking & Tasting Flights
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight">
            Reserve Your Barista Experience
          </h2>
          <p className="text-stone-600 text-sm mt-3 leading-relaxed">
            Join us for an unhurried morning table or reserve seats at our marble bar for a guided 45-minute cupping flight with our Head Roaster.
          </p>
        </div>

        {confirmedReservation ? (
          /* Confirmation Voucher */
          <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg border border-stone-200 p-8 text-center animate-fade-in">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">
              Reservation Confirmed
            </span>
            <h3 className="font-serif text-3xl text-stone-900 mt-1 mb-2">
              {confirmedReservation.type === 'tasting_flight' ? 'Cupping Flight Experience' : 'Table Reservation'}
            </h3>
            <p className="text-xs text-stone-500 font-mono">
              Confirmation Code: <span className="font-bold text-stone-900">{confirmedReservation.id}</span>
            </p>

            <div className="my-6 p-4 bg-stone-50 rounded-lg border border-stone-200 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                <span className="text-stone-500">Guest Name</span>
                <span className="font-medium text-stone-900">{confirmedReservation.name}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                <span className="text-stone-500">Date & Time</span>
                <span className="font-medium text-stone-900">{confirmedReservation.date} at {confirmedReservation.time}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                <span className="text-stone-500">Party Size</span>
                <span className="font-medium text-stone-900">{confirmedReservation.guests} Guest{confirmedReservation.guests > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                <span className="text-stone-500">Seating Area</span>
                <span className="font-medium text-stone-900">{confirmedReservation.seatingArea.split('(')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Notification Sent</span>
                <span className="font-medium text-stone-900">{confirmedReservation.email}</span>
              </div>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed max-w-sm mx-auto mb-6">
              A calendar invitation has been prepared. We look forward to welcoming you to the Atelier on Sakura Lane.
            </p>

            <button
              onClick={() => {
                setConfirmedReservation(null);
                setName('');
              }}
              className="px-6 py-2.5 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
            >
              Book Another Reservation
            </button>
          </div>
        ) : (
          /* Booking Form */
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-stone-200 overflow-hidden">
            
            {/* Experience Type Tabs */}
            <div className="grid grid-cols-2 border-b border-stone-200 bg-stone-50">
              <button
                type="button"
                onClick={() => setResType('tasting_flight')}
                className={`py-4 px-6 text-left border-b-2 transition-all cursor-pointer ${
                  resType === 'tasting_flight'
                    ? 'border-amber-800 bg-white text-stone-900'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-800" />
                  <span className="font-serif text-base font-semibold">Sensory Cupping Flight</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Guided tasting of 4 rare micro-lots with our head roaster ($28/person)
                </p>
              </button>

              <button
                type="button"
                onClick={() => setResType('table')}
                className={`py-4 px-6 text-left border-b-2 transition-all cursor-pointer ${
                  resType === 'table'
                    ? 'border-amber-800 bg-white text-stone-900'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-stone-600" />
                  <span className="font-serif text-base font-semibold">Standard Cafe Table</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Reserved seating for coffee, breakfast pastries, and dining
                </p>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Reservation Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-800 text-stone-800"
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Preferred Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-800 text-stone-800"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Party Size
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-800 text-stone-800"
                  >
                    {[1, 2, 3, 4, 5, 6].map((g) => (
                      <option key={g} value={g}>
                        {g} Guest{g > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Area */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Atmosphere & Seating Area
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {seatingAreas.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => setSeatingArea(area)}
                      className={`p-3 text-left text-xs rounded-md border transition-colors cursor-pointer ${
                        seatingArea === area
                          ? 'border-amber-800 bg-amber-50/50 text-stone-900 font-medium ring-1 ring-amber-800'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <span className="font-semibold block text-stone-900">{area.split('(')[0]}</span>
                      <span className="text-[10px] text-stone-500 mt-0.5 block">{area.split('(')[1]?.replace(')', '')}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-stone-100">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-md focus:ring-1 focus:ring-amber-800 text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@example.com"
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-md focus:ring-1 focus:ring-amber-800 text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Phone (SMS reminder) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 234-5678"
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-md focus:ring-1 focus:ring-amber-800 text-stone-800"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Special Tasting Preferences or Dietary Notes (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Celebrating an anniversary, prefer low caffeine, plant-based only..."
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-md focus:ring-1 focus:ring-amber-800 text-stone-800"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-stone-900 hover:bg-amber-900 text-white rounded-md text-xs font-semibold tracking-wide transition-colors shadow-sm cursor-pointer"
                >
                  {resType === 'tasting_flight' ? 'Confirm Tasting Flight Reservation' : 'Confirm Table Reservation'}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
