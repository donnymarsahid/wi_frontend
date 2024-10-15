"use client";

import { IP_URL } from "@/app/utils/constans";
import { getData, patchData } from "@/app/utils/fetching";
import { ButtonSecondary } from "@/components/atoms/button";
import { useUser } from "@/components/authContext";
import { getDecryptedLocalStorage } from "@/lib/utils";
import { ResultProvincies } from "@/types/provincies";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Autosuggest, {
  ChangeEvent,
  InputProps,
  SuggestionsFetchRequestedParams,
} from "react-autosuggest";
import Swal from "sweetalert2";

type SectionUserProfile = {
  listProvincies: ResultProvincies[];
};
interface Suggestion {
  name: string;
  subdistrict_name?: string;
}

const Section = ({ listProvincies }: SectionUserProfile) => {
  const { value, setUser } = useUser();
  const router = useRouter();

  const [province, setProvince] = useState<any>([]);
  const [city, setCity] = useState<any>([]);
  const [subdistrict, setSubdistrict] = useState<any>([]);
  const [resultProvince, setResultProvince] = useState<any>({});
  const [resultSubdistrict, setResultSubdistrict] = useState<any>({});
  const [resultCity, setResultCity] = useState<any>({});
  const [openLocation, setOpenLocation] = useState<boolean>(false);
  const [isCity, setIsCity] = useState<boolean>(false);
  const [isDetailAlamat, setIsDetailAlamat] = useState<boolean>(false);
  const [loadingCity, setLoadingCity] = useState<boolean>(false);
  const [loadingSubdistrict, setLoadingSubdistrict] = useState<boolean>(false);
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isSubdistrict, setIsSubdistrict] = useState<boolean>(false);
  const [valueDataProvince, setValueDataProvince] = useState<string>(
    value?.province?.province ? value?.province?.province : ""
  );
  const [formData, setFormData] = useState<any>({
    fullname: value?.fullname ?? "",
    phone: value?.phone ?? "",
    address: value?.address ?? "",
  });

  const sameClass =
    "transition duration-200 border-solid border-2 text-md font-bold leading-tight text-center inline-flex flex-col items-center justify-center";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getDecryptedLocalStorage(
        window.localStorage.getItem("token")
      );
      getData({
        path: `${IP_URL}/auth/me`,
        headers: {
          Authorization: token ?? "",
        },
        revalidate: 0,
      })
        .then((res) => {
          if (!res.data) {
            router.push("/");
          } else {
            setFormData({
              fullname: res.data.fullname,
              phone: res.data.phone,
              address: res.data.address,
            });
          }
        })
        .catch((err) => {
          router.push("/");
        });
    }
  }, []);

  useEffect(() => {
    if (value?.province && value?.city && value?.subdistrict) {
      if (
        Object.keys(value?.province).length > 0 &&
        Object.keys(value?.city).length > 0 &&
        Object.keys(value?.subdistrict).length > 0
      ) {
        if (value?.fullname && value?.phone && value?.address) {
          setResultProvince(value.province);
          setResultCity(value.city);
          setResultSubdistrict(value.subdistrict);
          setOpenLocation(true);
          setIsCity(false);
          setIsSubdistrict(false);
          setIsDetailAlamat(true);
          setReadOnly(true);
        }
      }
    }
  }, [value]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getDecryptedLocalStorage(
        window.localStorage.getItem("token")
      );
      if (token) {
        getData({
          path: `rajaongkir/city/${resultProvince?.province_id}`,
          revalidate: 0,
        })
          .then((res) => {
            if (res?.rajaongkir) {
              if (res.rajaongkir?.results?.length) {
                setCity(res.rajaongkir.results);
                setLoadingCity(false);
              }
            } else {
              Swal.fire("Ada kesalahan!", "", "info");

              setTimeout(() => {
                window.location.reload();
              }, 1500);
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire("Ada kesalahan!", "", "info");

            setTimeout(() => {
              window.location.reload();
            }, 1500);
          });
      }
    }
  }, [resultProvince]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getDecryptedLocalStorage(
        window.localStorage.getItem("token")
      );
      if (token) {
        getData({
          path: `rajaongkir/subdistrict/${resultCity?.city_id}`,
          revalidate: 0,
        })
          .then((res) => {
            if (res?.rajaongkir) {
              if (res.rajaongkir?.results?.length) {
                setSubdistrict(res.rajaongkir.results);
                setLoadingSubdistrict(false);
              }
            } else {
              Swal.fire("Ada kesalahan!", "", "info");

              setTimeout(() => {
                window.location.reload();
              }, 1500);
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire("Ada kesalahan!", "", "info");

            setTimeout(() => {
              window.location.reload();
            }, 1500);
          });
      }
    }
  }, [resultCity]);

  useEffect(() => {
    if (
      Object.keys(resultProvince).length > 0 &&
      resultCity &&
      Object.keys(resultCity).length > 0 &&
      resultSubdistrict &&
      Object.keys(resultSubdistrict).length > 0
    ) {
      if (value?.fullname && value?.phone && value?.address) {
        setIsValid(true);
      } else if (formData.fullname && formData.phone && formData.address) {
        setIsValid(true);
      }
    }
  }, [resultCity, resultProvince, resultSubdistrict, formData]);

  const handleInputAnyChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSuggestionsFetchRequestedProvince = ({
    value,
  }: SuggestionsFetchRequestedParams): void => {
    const newSuggestions = getSuggestionsProvince(value);
    setProvince(newSuggestions);
  };

  const getSuggestionsProvince = (valueData: string): Suggestion[] => {
    const filteredSuggestions = listProvincies.filter((suggestion) =>
      suggestion.province.toLowerCase().includes(valueData.toLowerCase())
    );
    const limitedSuggestions = filteredSuggestions.slice(0, 10);

    return limitedSuggestions;
  };

  const onSuggestionsClearRequestedProvince = (): void => {
    setProvince([]);
  };

  const renderSuggestionProvince = (suggestion: any): JSX.Element => {
    return <div>{suggestion.province}</div>;
  };

  const onChangeProvince = (
    event: React.FormEvent<any>,
    { newValue }: ChangeEvent
  ): void => {
    setValueDataProvince(newValue);
  };

  const inputPropsProvince: InputProps<Suggestion> = {
    placeholder: "Cari Provinsi...",
    value: valueDataProvince,
    onChange: onChangeProvince,
  };

  const onSubmit = async (data: any) => {
    try {
      if (!formData?.fullname || !formData?.phone || !formData?.address) {
        alert("Masukkan semua alamat!");
        return;
      }

      const token = getDecryptedLocalStorage(
        window.localStorage.getItem("token")
      );
      const dataSend: any = {};

      dataSend.fullname = formData.fullname || dataSend.fullname;
      dataSend.phone = formData.phone || dataSend.phone;
      dataSend.address = formData.address || dataSend.address;
      dataSend.province =
        resultProvince && Object.keys(resultProvince).length > 0
          ? resultProvince
          : dataSend.province;
      dataSend.city =
        resultCity && Object.keys(resultCity).length > 0
          ? resultCity
          : dataSend.city;
      dataSend.subdistrict =
        resultSubdistrict && Object.keys(resultSubdistrict).length > 0
          ? resultSubdistrict
          : dataSend.subdistrict;

      patchData({
        path: `users/${value?.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: dataSend,
      })
        .then((res) => {
          setUser(res);
          Swal.fire("Berhasil update alamat", "", "success");
          const getRouting = window.localStorage.getItem("routing");

          if (getRouting) router.push(getRouting);
          else router.push("/profile");
        })
        .catch((error) => {
          console.log(error);
          Swal.fire("Ada kesalahan!", "", "info");
        });
    } catch (error) {
      console.error("Error processing transaction:", error);
    }
  };

  const onResetAddress = () => {
    setIsValid(false);
    setIsCity(false);
    setIsSubdistrict(false);
    setOpenLocation(false);
    setResultProvince({});
    setResultCity({});
    setResultSubdistrict({});
    setReadOnly(false);
    setIsDetailAlamat(false);
    setFormData({});
    setValueDataProvince("");
    setCity([]);
    setSubdistrict([]);
  };

  return (
    <section className="flex  justify-center">
      <div className="w-full p-6 lg:w-1/2">
        {!openLocation && (
          <div className="mb-6">
            <p className="mb-2 text-gray-400">
              Masukkan Provinsi Terlebih Dahulu
            </p>
            <Autosuggest
              suggestions={province}
              onSuggestionsFetchRequested={onSuggestionsFetchRequestedProvince}
              onSuggestionsClearRequested={onSuggestionsClearRequestedProvince}
              getSuggestionValue={(suggestion: any) => {
                setOpenLocation(true);
                setIsCity(true);
                setResultProvince(suggestion);
                setLoadingCity(true);
                return suggestion.province;
              }}
              renderSuggestion={renderSuggestionProvince}
              inputProps={inputPropsProvince}
              focusInputOnSuggestionClick={true}
            />
          </div>
        )}
        {openLocation ? (
          <div>
            <div className="flex justify-between">
              <p className="text-gray-400">Lokasi Terpilih</p>
              <button className="text-sm text-red-400" onClick={onResetAddress}>
                Atur Ulang Alamat
              </button>
            </div>

            <div className="mt-4 border-l-2 border-gray-300">
              <div className="mt-4 flex items-center">
                <div className="ms-[-7px]  text-lg text-gray-300">●</div>
                <h1 className="ms-4">{resultProvince?.province}</h1>
              </div>
              {isCity ? (
                <>
                  <div className="ms-[-25px] mt-4 flex items-center border bg-white px-6 py-2">
                    <div className="ms-[-9px] flex h-[15px] items-center justify-center">
                      <Image
                        src={"/assets/icons/active-dots-list.svg"}
                        alt="icon"
                        width={16}
                        height={16}
                      />
                    </div>
                    <h1 className="ms-4">Pilih Kota</h1>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="ms-[-7px]  text-lg text-gray-300">●</div>
                    <h1 className="ms-4">Pilih Kecamatan</h1>
                  </div>
                </>
              ) : isSubdistrict ? (
                <>
                  <div className="mt-4 flex items-center">
                    <div className="ms-[-7px]  text-lg text-gray-300">●</div>
                    <h1 className="ms-4">
                      {resultCity?.city_name} ({resultCity?.type})
                    </h1>
                  </div>
                  <div className="ms-[-25px] mt-4 flex items-center border bg-white px-6 py-2">
                    <div className="ms-[-9px] flex h-[15px] items-center justify-center">
                      <Image
                        src={"/assets/icons/active-dots-list.svg"}
                        alt="icon"
                        width={16}
                        height={16}
                      />
                    </div>
                    <h1 className="ms-4">Pilih Kecamatan</h1>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-4 flex items-center">
                    <div className="ms-[-7px]  text-lg text-gray-300">●</div>
                    <h1 className="ms-4">
                      {resultCity?.city_name} ({resultCity?.type}) -{" "}
                      {resultCity?.postal_code}
                    </h1>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="ms-[-7px]  text-lg text-gray-300">●</div>
                    <h1 className="ms-4">
                      {resultSubdistrict?.subdistrict_name}
                    </h1>
                  </div>
                </>
              )}
            </div>

            <div className="mt-6">
              {!isDetailAlamat && (
                <div className="bg-gray-100 p-2">
                  <h1 className="text-gray-400">
                    Pilih {isCity ? "Kota" : isSubdistrict ? "Kecamatan" : ""}{" "}
                    Anda
                  </h1>
                </div>
              )}
              {loadingCity && (
                <div className="flex justify-center py-4">
                  Sedang memuat kota...
                </div>
              )}
              {loadingSubdistrict && (
                <div className="flex justify-center py-4">
                  Sedang memuat kecamatan...
                </div>
              )}
              {isCity &&
                !isDetailAlamat &&
                city.map((item: any, index: number) => (
                  <button
                    className="my-2 w-full border-b-2 border-gray-100 p-2 text-left uppercase hover:bg-blue-100"
                    key={index}
                    onClick={() => {
                      setResultCity(item);
                      setIsCity(false);
                      setIsSubdistrict(true);
                      setLoadingSubdistrict(true);
                    }}
                  >
                    {item.city_name} ({item.type})
                  </button>
                ))}
              {isSubdistrict &&
                !isDetailAlamat &&
                subdistrict.map((item: any, index: number) => (
                  <button
                    className="my-2 w-full border-b-2 border-gray-100 p-2 text-left uppercase hover:bg-blue-100"
                    key={index}
                    onClick={() => {
                      setResultSubdistrict(item);
                      setIsSubdistrict(false);
                      setIsDetailAlamat(true);
                    }}
                  >
                    {item.subdistrict_name}
                  </button>
                ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between">
              <p className="text-gray-400">Lokasi Terpilih</p>
            </div>

            <div className="mt-4 border-l-2 border-gray-300">
              <div className="ms-[-25px] flex items-center border bg-white px-6 py-2">
                <div className="ms-[-9px] flex h-[15px] items-center justify-center">
                  <Image
                    src={"/assets/icons/active-dots-list.svg"}
                    alt="icon"
                    width={16}
                    height={16}
                  />
                </div>
                <h1 className="ms-4">Pilih Provinsi</h1>
              </div>
              <div className="mt-4 flex items-center">
                <div className="ms-[-7px] text-lg text-gray-300">●</div>
                <h1 className="ms-4">Pilih Kota</h1>
              </div>
              <div className="mt-4 flex items-center">
                <div className="ms-[-7px]  text-lg text-gray-300">●</div>
                <h1 className="ms-4">Pilih Kecamatan</h1>
              </div>
            </div>

            <div className="mt-6">
              <div className="bg-gray-100 p-2">
                <h1 className="text-gray-400">
                  Ketik dan Cari Provinsi, Kolom diatas
                </h1>
              </div>
            </div>
          </div>
        )}
        {isDetailAlamat && (
          <div className="mt-6">
            <div className="bg-gray-100 p-2">
              <h1 className="text-gray-400">
                Masukkan Detail Alamat Lengkap dan Data Penerima
              </h1>
            </div>
            <div className="flex flex-col">
              <label className="mt-4">Nama Lengkap</label>
              <input
                defaultValue={formData?.fullname}
                type="text"
                name="fullname"
                onChange={handleInputAnyChange}
                readOnly={readOnly}
                className="outline-none p-2 border border-1"
                placeholder="Masukkan nama lengkap"
              />
              <label className="mt-4">Nomor Telepon</label>
              <input
                defaultValue={formData?.phone}
                type="number"
                name="phone"
                onChange={handleInputAnyChange}
                readOnly={readOnly}
                className="outline-none p-2 border border-1"
                placeholder="Masukkan nomor telepon"
              />
              <textarea
                defaultValue={formData?.address}
                className="mt-4 rounded-lg text-sm outline-none p-2 border border-1"
                style={{ resize: "none" }}
                name="address"
                onChange={handleInputAnyChange}
                placeholder="Masukkan alamat detail Rt/Rw No.rumah dll"
                readOnly={readOnly}
                rows={3}
              />
            </div>
          </div>
        )}
        {isValid && !readOnly ? (
          <button
            onClick={onSubmit}
            className={`${sameClass} mt-4 w-full rounded-full border-blue-400 bg-blue-400 px-10 py-3 text-white hover:bg-blue-300 hover:text-blue-400`}
          >
            {" "}
            Simpan Alamat
          </button>
        ) : !isValid && !readOnly ? (
          <button
            className={`${sameClass} mt-4 w-full cursor-default rounded-full border-gray-200 bg-gray-200 px-10 py-3 text-gray-300`}
          >
            {" "}
            Simpan Alamat
          </button>
        ) : (
          <button
            onClick={onResetAddress}
            className={`${sameClass} mt-4 w-full rounded-full border-red-400 bg-red-400 px-10 py-3 text-white hover:bg-red-300 hover:text-red-400`}
          >
            {" "}
            Atur Ulang Alamat
          </button>
        )}
        <button
          onClick={() => {
            const getRouting = window.localStorage.getItem("routing");
            if (getRouting) {
              window.localStorage.removeItem("routing");
              router.push(getRouting);
            } else router.push("/profile");
          }}
          className={`${sameClass} mt-4 w-full rounded-full border-blue-400 bg-blue-400 px-10 py-3 text-white hover:bg-blue-300 hover:text-blue-400`}
        >
          {" "}
          Kembali
        </button>
      </div>
    </section>
  );
};

export default Section;
