'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

interface Craftsman {
  id: number;
  name: string;
  profession: string;
  location: string;
  averageRating: number;
  isTrusted: boolean;
  imageUrl: string;
}

interface Profession {
  id: string;
  name: string;
}

interface Location {
  value: string;
  label: string;
}

interface RatingOption {
  value: string;
  label: string;
}

interface TrustOption {
  value: string;
  label: string;
}

interface Filters {
  ProfessionId: string;
  Location: string;
  MinRating: string;
  IsTrusted: string;
  PageNumber: number;
  PageSize: number;
}

const CraftsmenPage = () => {
  const [craftsmen, setCraftsmen] = useState<Craftsman[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiLocations, setApiLocations] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const professionParam = searchParams.get('profession');

  const [filters, setFilters] = useState<Filters>({
    ProfessionId: professionParam || '',
    Location: '',
    MinRating: '',
    IsTrusted: '',
    PageNumber: 1,
    PageSize: 8
  });

  // Fetch locations from API on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('https://sani3ywebapiv1.runasp.net/api/AiCraftsman/locations');
        const data = await response.json();
        setApiLocations(data.locations || []);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    
    fetchLocations();
  }, []);

  const professions: Profession[] = [
    { id: '', name: 'الـكــل' },
    { id: '1', name: 'كهربائي' },
    { id: '2', name: 'سباك' },
    { id: '3', name: 'نجار' }
  ];

  // Generate locations from API data
  const locations: Location[] = [
    { value: '', label: 'الـكــل' },
    ...apiLocations.map(loc => ({
      value: loc,
      label: loc
    }))
  ];

  const ratings: RatingOption[] = [
    { value: '', label: 'الـكــل' },
    { value: '3', label: '3 نجوم فأكثر' },
    { value: '4', label: '4 نجوم فأكثر' },
    { value: '4.5', label: '4.5 نجوم فأكثر' }
  ];

  const trustOptions: TrustOption[] = [
    { value: '', label: 'الـكــل' },
    { value: 'true', label: 'موثوق فقط' },
    { value: 'false', label: 'غير موثوق' }
  ];

  useEffect(() => {
    fetchCraftsmen();
  }, [filters]);

  const fetchCraftsmen = async () => {
    try {
      setLoading(true);
      const authToken = localStorage.getItem('authToken');

      // Build query string from filters
      const queryParams = new URLSearchParams();
      if (filters.ProfessionId) queryParams.append('ProfessionId', filters.ProfessionId);
      if (filters.Location) queryParams.append('Location', filters.Location);
      if (filters.MinRating) queryParams.append('MinRating', filters.MinRating);
      if (filters.IsTrusted) queryParams.append('IsTrusted', filters.IsTrusted);
      queryParams.append('PageNumber', filters.PageNumber.toString());
      queryParams.append('PageSize', filters.PageSize.toString());

      const response = await fetch(
        `https://sani3ywebapiv1.runasp.net/api/User/Get/craftsmenList?${queryParams}`,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const data = await response.json();
      
      setCraftsmen(data);
    } catch (error) {
      console.error('Error fetching craftsmen:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      PageNumber: 1 // Reset to first page when filters change
    }));
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Image key={i} src="/images/Starf.svg" alt="star" width={16} height={16} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Image key={i} src="/images/StarHalf.svg" alt="half star" width={16} height={16} />);
      } else {
        stars.push(<Image key={i} src="/images/Star.svg" alt="empty star" width={16} height={16} />);
      }
    }
    
    return stars;
  };

  return (
    <div className='screen'>
      <div className="container0">
        <div className="menu">
          <div className="nam">
            <span>قــائمـة الــصنــايـعــية</span> 
            <Image src="/images/Fill 177.svg" alt="craftsmen icon" width={24} height={24} />
          </div>
          
          <div className='filter grid grid-cols-1 md:grid-cols-4 gap-3.5'>
            <div className='select-div'>
              <p>المهنــة</p>
              <select 
                name="ProfessionId"
                value={filters.ProfessionId}
                onChange={handleFilterChange}
              >
                {professions.map(prof => (
                  <option key={prof.id} value={prof.id}>{prof.name}</option>
                ))}
              </select>
            </div>
            
            <div className='select-div'>
              <p>المــنطقــة</p>
              <select 
                name="Location"
                value={filters.Location}
                onChange={handleFilterChange}
              >
                {locations.map(loc => (
                  <option key={loc.value} value={loc.value}>{loc.label}</option>
                ))}
              </select>
            </div>
            
            <div className='select-div'>
              <p>الــتقــييم</p>
              <select 
                name="MinRating"
                value={filters.MinRating}
                onChange={handleFilterChange}
              >
                {ratings.map(rating => (
                  <option key={rating.value} value={rating.value}>{rating.label}</option>
                ))}
              </select>
            </div>
            
            <div className='select-div'>
              <p>الـهــويـة</p>
              <select 
                name="IsTrusted"
                value={filters.IsTrusted}
                onChange={handleFilterChange}
              >
                {trustOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <section>
        {loading ? (
          <div className="loading">جاري التحميل...</div>
        ) : (
          <div className="frame-280 grid grid-cols-1 md:grid-cols-4">
            {craftsmen?.data?.map(craftsman => (
              <div key={craftsman.id} className="frame-28">
                <div className="menu-list-plus">
                  <div className="img-profile">
                    <img 
                      src={craftsman?.profileImagePath ? `https://sani3ywebapiv1.runasp.net${craftsman?.profileImagePath}` :"/images/Ellipse 6.svg"} 
                      alt={craftsman.name} 
                      width={80} 
                      height={80}
                      className="rounded-full"
                    />
                  </div>
                  
                  <div className="profile-name">
                    <div><span>{craftsman.fullName}</span></div>
                    {craftsman.identityVerified && (
                      <div>
                        <Image src="/images/verify.svg" alt="verified" width={16} height={16} />
                      </div>
                    )}
                  </div>
                  
                  <div className="work"><span>{craftsman.profession}</span></div>
                  
                  <div className="location">
                    <div>
                      <Image src="/images/Location.svg" alt="location" width={16} height={16} />
                    </div>
                    <div><span>{craftsman.location}</span></div>
                  </div>
                  
                  <div className="line0">
                    <div className="line0"></div>
                  </div>
                  
                  <div className="rating-div">
                    <div className="ratimg-text">
                      <span>الــتقــييم</span>
                    </div>
                    <div className="riting">
                      {renderStars(craftsman.averageRating)}
                    </div>
                  </div>
                  
                  <div className="more-det">
                    <Link href={`/craftsman?id=${craftsman.id}`}>عرض التفاصيل</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CraftsmenPage;