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
        <Body className="bg-white my-auto mx-auto font-sans px-2 py-4">
          <Container className="p-8 max-w-[500px]">
            <Section className="mb-2">
              <Heading className="text-2xl text-zinc-700 font-bold m-0">
                Confirm your email address
              </Heading>
            </Section>
            <Section className="mb-8">
              <Text className="text-zinc-600 m-0">
                Please enter the following verification code in your open
                browser window and we'll get you on your way:
              </Text>
            </Section>
            <Section className="text-center bg-zinc-100 py-4 rounded-md mb-8 shadow-lg">
              <Text className="text-4xl tracking-[4px] text-zinc-700 font-bold my-1 font-mono">
                {verificationCode}
              </Text>
            </Section>
            <Section className="mb-8">
              <Text className="text-zinc-400 m-0">
                If you did not request this email, there is nothing to worry
                about, you can safely ignore it.
              </Text>
            </Section>
            <Hr />
            <Section>
              <Link href={baseUrl} className="text-zinc-400 m-0">
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
