'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { togglePlugin } from '@/lib/slices/pluginSlice';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PluginSelector = () => {
  const dispatch = useDispatch();
  const { availablePlugins, selectedPlugins } = useSelector((state: RootState) => state.plugins);

  const handleToggle = (pluginId: string) => {
    dispatch(togglePlugin(pluginId));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {availablePlugins.map((plugin) => (
        <Card key={plugin.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {plugin.name}
              <Switch
                checked={selectedPlugins.includes(plugin.id)}
                onCheckedChange={() => handleToggle(plugin.id)}
              />
            </CardTitle>
            <CardDescription>${plugin.price}/month</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{plugin.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PluginSelector;