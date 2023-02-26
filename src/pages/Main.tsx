import { FC, useCallback, useEffect, useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useTranslation } from "react-i18next";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { currencies } from "../utils/constants";
import {
  currenciesSelector,
  getAllCurrencies,
} from "../store/reducers/currencies";
import dayjs from "dayjs";

type Props = {};

export const Main: FC<Props> = () => {
  const { t } = useTranslation();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(0);
  const dispatch = useAppDispatch();
  const { result } = useAppSelector(currenciesSelector);

  const [date, setDate] = useState<string | null>(
    dayjs(new Date()).format("YYYY-MM-DD")
  );

  const handleChangeDate = (newValue: string | null) => {
    setDate(dayjs(newValue).format("YYYY-MM-DD"));
  };
  const handleChangeFrom = (event: SelectChangeEvent) => {
    setFrom(event.target.value as string);
  };

  const handleChangeTo = (event: SelectChangeEvent) => {
    setTo(event.target.value as string);
  };

  const handleChangeAmount = useCallback((event: any) => {
    setAmount(event.target.value as number);
  }, []);

  useEffect(() => {
    if (from && to) {
      dispatch(
        getAllCurrencies({
          from: from,
          to: to,
          amount: amount,
          date: date,
        })
      );
    }
  }, [from, to, amount, date]);

  return (
    <Container>
      <Stack direction="column" spacing={2}>
        <Typography variant="h5" component="h2" textAlign="center">
          {t("convert")}
        </Typography>
        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{t("from")}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={from}
              label="From"
              onChange={handleChangeFrom}
            >
              {currencies.map((currency: string) => {
                return (
                  <MenuItem key={currency} value={currency}>
                    {t(`currencies.${currency}`)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{t("to")}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={to}
              label="To"
              onChange={handleChangeTo}
            >
              {currencies.map((currency: string) => {
                return (
                  <MenuItem key={currency} value={currency}>
                    {t(`currencies.${currency}`)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            value={amount}
            onChange={(e: any) => handleChangeAmount(e)}
            fullWidth
            type="number"
            id="outlined-basic"
            label=""
            variant="outlined"
          />
          <TextField
            fullWidth
            value={result}
            type="number"
            id="outlined-basic"
            label=""
            variant="outlined"
          />
        </Stack>
        <DesktopDatePicker
          label={t('chooseData')}
          inputFormat="MM/DD/YYYY"
          value={date}
          onChange={handleChangeDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </Container>
  );
};
