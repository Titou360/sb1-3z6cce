import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Plugin {
  id: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}

interface PluginState {
  availablePlugins: Plugin[];
  selectedPlugins: string[];
}

const initialState: PluginState = {
  availablePlugins: [],
  selectedPlugins: [],
};

const pluginSlice = createSlice({
  name: 'plugins',
  initialState,
  reducers: {
    setAvailablePlugins: (state, action: PayloadAction<Plugin[]>) => {
      state.availablePlugins = action.payload;
    },
    togglePlugin: (state, action: PayloadAction<string>) => {
      const pluginId = action.payload;
      if (state.selectedPlugins.includes(pluginId)) {
        state.selectedPlugins = state.selectedPlugins.filter(id => id !== pluginId);
      } else {
        state.selectedPlugins.push(pluginId);
      }
    },
    setSelectedPlugins: (state, action: PayloadAction<string[]>) => {
      state.selectedPlugins = action.payload;
    },
  },
});

export const { setAvailablePlugins, togglePlugin, setSelectedPlugins } = pluginSlice.actions;
export default pluginSlice.reducer;