import { ReactElement, useEffect, useState } from "react";

import {
  Fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const CYCLE_DURATION = 1800;
const FADE_DURATION = 400;
const STAGGER = 200;

const ICON_SX = {
  color: "primary.main",
  alignItems: "center",
  justifyContent: "center",
};

type Item = {
  icon: ReactElement;
  text: string;
};

type ListAnimationProps = {
  items: Item[];
};

const ListItemAnimation = ({ items }: ListAnimationProps) => {
  const [cycleIndex, setCycleIndex] = useState(0);
  const [itemVisible, setItemVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [shownItems, setShownItems] = useState([false, false, false]);

  useEffect(() => {
    if (expanded) return;

    const timer = setTimeout(
      () => {
        if (itemVisible) {
          setItemVisible(false);
        } else {
          const next = cycleIndex + 1;
          if (next >= items.length) {
            setExpanded(true);
            items.forEach((_, i) => {
              setTimeout(() => {
                setShownItems((prev) => {
                  const arr = [...prev];
                  arr[i] = true;
                  return arr;
                });
              }, i * STAGGER);
            });
          } else {
            setCycleIndex(next);
            setItemVisible(true);
          }
        }
      },
      itemVisible ? CYCLE_DURATION : FADE_DURATION
    );

    return () => clearTimeout(timer);
  }, [cycleIndex, expanded, items, itemVisible]);

  if (!expanded) {
    const { icon, text } = items[cycleIndex] || {};

    return (
      <List>
        <Fade in={itemVisible} timeout={FADE_DURATION}>
          <ListItem>
            <ListItemIcon sx={ICON_SX}>{icon}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </ListItem>
        </Fade>
      </List>
    );
  }

  return (
    <List>
      {items.map(({ icon, text }, i) => (
        <Fade key={i} in={shownItems[i]} timeout={FADE_DURATION}>
          <ListItem>
            <ListItemIcon sx={ICON_SX}>{icon}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </ListItem>
        </Fade>
      ))}
    </List>
  );
};

export default ListItemAnimation;
