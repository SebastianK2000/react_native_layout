import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';

type RelativePathString = string; // Define as needed
type ExternalPathString = string; // Define as needed

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: RelativePathString | ExternalPathString | "/sign-in" | `/sign-in?${string}` | `/sign-in#${string}` | "/_sitemap" | `/_sitemap?${string}` | `/_sitemap#${string}` | "/(root)/(tabs)/explore" | string };

export function ExternalLink({ href, ...rest }: Props) {
    return (
        <Link
            target="_blank"
            {...rest}
            href={href}
            onPress={async (event) => {
                if (Platform.OS !== 'web') {
                    // Prevent the default behavior of linking to the default browser on native.
                    event.preventDefault();
                    // Open the link in an in-app browser.
                    await openBrowserAsync(href);
                }
            }}
        />
    );
}