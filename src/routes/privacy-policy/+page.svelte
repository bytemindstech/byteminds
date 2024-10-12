<script>
  import { route } from "$lib/ROUTES";
</script>

<div class="container mx-auto px-6 py-10">
  <h2 class="h2 text-surface-900 mb-2">Privacy Policy of ByteMinds PH</h2>
  <p class="text-surface-600 mb-6">Effective Date: January 1, 2025</p>

  <div class="max-w-none">
    <p>
      At ByteMinds PH, we value and respect the privacy of our users. This
      Privacy Policy outlines the types of personal information we collect, how
      we use and protect that information, and your rights as a user of our
      website, <a href={route("bytemindsph")} class="anchor"
        >https://bytemindsph.com</a
      > ("Website"). By accessing and using our Website, you agree to this Privacy
      Policy. If you do not agree with any part of this policy, please do not use
      our Website.
    </p>

    <hr class="!border-t-8 !border-double mt-8" />

    <ol class="list-decimal list-inside mt-4">
      <li>
        <strong>Information We Collect:</strong> We collect personal information
        from users only during the registration process. The information
        collected may include but is not limited to:

        <ul class="list-disc list-inside ml-4 mt-4">
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Username and Password</li>
        </ul>
        <p>
          We <strong>do not</strong> collect information through cookies for advertising
          purposes or retargeting ads.
        </p>
      </li>

      <li>
        <strong>Purpose of Information Collection:</strong> The personal
        information collected upon registration is used for the following
        purposes:

        <ul class="list-disc list-inside ml-4 mt-4">
          <li>To create and manage your account on ByteMinds PH</li>
          <li>
            To provide access to features and services available on the Website
          </li>
          <li>
            To communicate important information about your account or updates
            to our Website
          </li>
          <li>To ensure compliance with our Terms and Conditions</li>
        </ul>
      </li>

      <li>
        <strong> Parental Consent and Children's Privacy:</strong> ByteMinds PH allows
        minors or children to register for an account only when a parent or guardian
        has already registered and created their account. Parents or guardians will
        have the responsibility of registering their children on the Website. We
        do not knowingly collect information directly from minors without parental
        consent. By registering your child, you affirm that you are a parent or guardian
        and provide consent for your child's registration.
      </li>

      <li>
        <strong>Data Protection:</strong> We take the protection of your personal
        data seriously and implement reasonable measures to safeguard the information
        you provide. While no online service can guarantee absolute security, we
        strive to use best practices to ensure your data is secure.
      </li>

      <li>
        <strong>Data Sharing and Disclosure:</strong> ByteMinds PH does not
        sell, rent, or trade personal information to third parties for marketing
        purposes. We may, however, disclose information if required to do so by
        law or if it is necessary to:
        <ul class="list-disc list-inside ml-4 mt-4">
          <li>Comply with legal obligations</li>
          <li>Protect and defend the rights or property of ByteMinds PH</li>
          <li>Protect the safety of our users and the public</li>
        </ul>
      </li>

      <li>
        <strong>User Rights:</strong> As a registered user, you have the right
        to:
        <ul class="list-disc list-inside ml-4 mt-4">
          <li>Access and review the personal information we hold about you</li>
          <li>Request corrections or updates to your personal information</li>
          <li>
            Request the deletion of your account and personal data from our
            systems
          </li>
        </ul>

        <p>
          To exercise any of these rights, please contact us at
          <a
            href={route("mailTo", { email: "info@bytemindsph.com" })}
            class="anchor">info@bytemindsph.com</a
          >
        </p>
      </li>

      <li>
        <strong>Changes to the Privacy Policy:</strong> We may update this Privacy
        Policy from time to time. Any changes will be posted on this page with an
        updated effective date. We encourage you to periodically review this policy
        to stay informed about how we protect your data.
      </li>

      <li>
        <strong> Contact Us:</strong> If you have any questions or concerns
        about this Privacy Policy, please feel free to contact us at:

        <ul class="ml-4 mt-4">
          <li><h6 class="h6">ByteMinds PH</h6></li>
          <li>
            Email: <a
              href={route("mailTo", { email: "info@bytemindsph.com" })}
              class="anchor">info@bytemindsph.com</a
            >
          </li>
          <li>
            Website: <a href={route("bytemindsph")} class="anchor"
              >https://bytemindsph.com</a
            >
          </li>
        </ul>
      </li>
    </ol>

    <hr class="!border-dotted mb-8" />

    <p>
      By using our Website, you acknowledge that you have read and understood
      this Privacy Policy and agree to its terms.
    </p>
  </div>
</div>

<style>
  ul,
  ol {
    margin-bottom: 20px;
  }

  ul li,
  ol li {
    margin-bottom: 14px;
  }
</style>
