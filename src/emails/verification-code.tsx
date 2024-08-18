/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface VerifyUserEmailProps {
  verificationCode: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const VerifyUserEmail = ({ verificationCode }: VerifyUserEmailProps) => {
  const previewText = `Your verification code is "${verificationCode}".`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 py-4 font-sans">
          <Container className="max-w-[500px] p-8">
            <Section className="mb-2">
              <Heading className="m-0 text-2xl font-bold text-zinc-700">
                Confirm your email address
              </Heading>
            </Section>
            <Section className="mb-8">
              <Text className="m-0 text-zinc-600">
                Please enter the following verification code in your open
                browser window and we'll get you on your way:
              </Text>
            </Section>
            <Section className="mb-8 rounded-md bg-zinc-100 py-4 text-center shadow-lg">
              <Text className="my-1 font-mono text-4xl font-bold tracking-[4px] text-zinc-700">
                {verificationCode}
              </Text>
            </Section>
            <Section className="mb-8">
              <Text className="m-0 text-zinc-400">
                If you did not request this email, there is nothing to worry
                about, you can safely ignore it.
              </Text>
            </Section>
            <Hr />
            <Section>
              <Link href={baseUrl} className="m-0 text-zinc-400">
                - Monoform
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

VerifyUserEmail.PreviewProps = {
  verificationCode: "ECE81A",
} as VerifyUserEmailProps;

export default VerifyUserEmail;
