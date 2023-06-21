//@ts-nocheck
import React from 'react';
import { ActionIcon, Button, useMantineColorScheme,  } from '@mantine/core';
import { SunIcon, MoonIcon } from '@modulz/radix-icons';

const LightDarkButton = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
  return (
    <div>
        <ActionIcon
        variant="outline"
        color={dark ? 'yellow':'blue'}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
        >
            {
                dark ? (
                    <SunIcon style={{ width: 18, height: 18 }}/>
                ) : (
                    
                    <MoonIcon style={{ width: 18, height: 18 }} />
                )
            }
        </ActionIcon>

    </div>
  )
}

export default LightDarkButton