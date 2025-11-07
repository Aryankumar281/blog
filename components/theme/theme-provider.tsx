'use client'
import {ThemeProvider as NextThemesProvider, ThemeProviderProps} from 'next-themes';
import Header from '../layout/header';
import { cn } from '@/lib/utils';

interface ExtendedThemeProviderProps extends ThemeProviderProps{
    containerClassName? : string
}
export function ThemeProvider({
    children,
    containerClassName,
    ...props
}:ExtendedThemeProviderProps){
    return(
        <NextThemesProvider {...props}>
            <Header/>
            <main className={cn('container mx-auto px-4')}>
                {children}
            </main>
            {/* footer component here */}
        </NextThemesProvider>
    )
}