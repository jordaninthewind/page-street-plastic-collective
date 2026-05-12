import { CircularProgress, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import withAuth from "@app/components/HOC/withAuth";
import { COVER_TYPES } from "@app/constants";
import { useSearchParamState } from "@app/hooks";
import useMapStore from "@app/stores/mapStore";
import type { User } from "@app/types";
import { formatDecimal } from "@app/utils";

interface AddDrainCoverFormValues {
  cover_type: string;
  address: string;
  requested_by: string;
  email: string;
  description: string;
}

const AddDrainCover = withAuth(({ user }: { user: User | null }) => {
  const { id, lng, lat, setParams } = useSearchParamState();

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<AddDrainCoverFormValues>({
      defaultValues: { cover_type: "standard-square" },
    });

  const {
    addCover,
    searchNearbyAddresses,
    searchLoading,
    searchError,
    searchResults,
    saving,
    loading,
    error,
  } = useMapStore();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) enqueueSnackbar(error, { variant: "error" });
  }, [error, enqueueSnackbar]);

  useEffect(() => {
    if (!lng || !lat) return;
    searchNearbyAddresses(Number(lng), Number(lat));
  }, [id, lng, lat, searchNearbyAddresses]);

  const onSubmit = async (data: AddDrainCoverFormValues) => {
    try {
      await addCover({
        lng: Number(lng),
        lat: Number(lat),
        ...data,
        requested_by: user?.name ?? data.requested_by,
      });
      enqueueSnackbar(
        "We received your request and will update the map and (try to) send you an email when it's been added!",
        { variant: "success" }
      );
      setParams({});
      reset();
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  const handleLocationClick = () =>
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setParams({
          lat: String(coords.latitude),
          lng: String(coords.longitude),
        });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

  if (!id && !lat && !lng) return null;

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="eyebrow">Missing a cover here?</div>
        <button className="map-close-btn" onClick={() => setParams({})}>×</button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p className="cover-details-meta" style={{ margin: 0 }}>
          Location: {formatDecimal(lat)}, {formatDecimal(lng)}
        </p>
        <button type="button" className="map-btn map-btn--sm" onClick={handleLocationClick}>
          Use GPS
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <span className="map-field-label">Nearby Addresses</span>
          {searchLoading ? (
            <CircularProgress size={18} />
          ) : searchError ? (
            <p className="cover-details-meta" style={{ color: "#c00" }}>{searchError}</p>
          ) : searchResults.length > 0 ? (
            <div style={{ display: "flex", gap: 6 }}>
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  type="button"
                  className="map-btn map-btn--sm"
                  onClick={() => setValue("address", result.text)}
                >
                  {result.text}
                </button>
              ))}
            </div>
          ) : (
            <p className="cover-details-meta">No nearby addresses found</p>
          )}
        </div>

        <TextField
          label="Address"
          fullWidth
          focused
          placeholder="Any nearby street address"
          {...register("address")}
          required
          slotProps={{
            input: {
              endAdornment: watch("address") ? (
                <button
                  type="button"
                  className="map-close-btn"
                  style={{ border: "none" }}
                  onClick={() => setValue("address", "")}
                >
                  ×
                </button>
              ) : null,
            },
          }}
        />

        <div>
          <span className="map-field-label">Cover Type</span>
          <div className="map-filter-row">
            {COVER_TYPES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                className={`cover-type-tag${watch("cover_type") === value ? " cover-type-tag--active" : ""}`}
                onClick={() => setValue("cover_type", value)}
              >
                {label}
              </button>
            ))}
          </div>
          <input type="hidden" {...register("cover_type")} />
        </div>

        {user ? (
          <>
            <input type="hidden" {...register("requested_by")} value={user.id} />
            <input type="hidden" {...register("email")} value={user.email} />
          </>
        ) : (
          <>
            <TextField
              label="Requested By"
              fullWidth
              {...register("requested_by")}
              required
              placeholder="Emperor Norton II of San Francisco"
            />
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              {...register("email")}
              required
              placeholder="example@example.com"
            />
          </>
        )}

        <TextField
          label="Anything else?"
          fullWidth
          multiline
          rows={3}
          {...register("description")}
          placeholder="Give some details if you want!"
        />

        <button
          type="submit"
          className="map-btn map-btn--fill"
          disabled={loading || saving || !watch("address")}
        >
          {saving ? "Sending Request..." : "Add Request"}
        </button>
      </form>
    </div>
  );
});

export default AddDrainCover;
